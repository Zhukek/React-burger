import { TSocketActions } from "../actions/wsSocket";
import { ThunkMiddleware } from "redux-thunk";
import { IWsActions } from "../actions/wsSocket";
import { RootState } from "../types";
import { ISocketResponse } from "../types/data";
import { Action } from "redux";

export const socketMiddleware = (wsActions: IWsActions, wsAllURL: string, wsPrivateURL: string): ThunkMiddleware<RootState, TSocketActions, never> => {
  return (store) => {
    let socket: WebSocket;

    return (next) => (action: TSocketActions) => {
      const {dispatch, getState} = store;
      const {type}  = action;
      const { open, close, onOpen, onClose, error, onMessage, openPrivate , onMessagePrivate} = wsActions;
      const {accessToken} = getState().user;
      const isPrivate = getState().socket.private;
      const token = accessToken.split(' ')[1];

      if (type === open) {
        socket = new WebSocket(wsAllURL)
      }

      if (type === openPrivate) {
        socket = new WebSocket(wsPrivateURL + `?token=${token}`)
      }

      if (type === close) {
        socket.close(1000, "работа закончена");
      }

      if (socket) {
        socket.onopen = e => {
          dispatch({type: onOpen});
        }

        socket.onmessage = e => {
          const {data} = e;
          const parsed: ISocketResponse = JSON.parse(data);
          if (parsed.success) {
            isPrivate ?
            dispatch({
              type: onMessagePrivate,
              orders: parsed.orders
            }) :
            dispatch({
              type: onMessage,
              total: parsed.total,
              totalToday: parsed.totalToday,
              orders: parsed.orders
            })
          }
        }

        socket.onclose = e => {
          dispatch({type: onClose});
        }

        socket.onerror = e => {
          dispatch({type: error})
        }
      }

      next(action)
    }
  }
}