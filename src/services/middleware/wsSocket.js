export const socketMiddleware = (wsActions, wsAllURL, wsPrivateURL) => {
  return store => {
    let socket = null;

    return next => action => {
      const {dispatch, getState} = store;
      const {type, payload}  = action;
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
          const parsed = JSON.parse(data);
          if (parsed.success) {
            isPrivate ?
            dispatch({
              type: onMessagePrivate,
              orders: parsed.orders
            }) :
            dispatch({
              type: onMessage,
              total: parsed.total,
              today: parsed.totalToday,
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