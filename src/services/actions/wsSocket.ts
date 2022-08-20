import { TOrder, ISocketResponse } from "../types/data";

export const WS_SOCKET_OPEN = 'WS_SOCKET_OPEN';
export const WS_SOCKET_OPEN_PRIVATE = 'WS_SOCKET_OPEN_PRIVATE';
export const WS_SOCKET_CLOSE = 'WS_SOCKET_CLOSE';
export const WS_OPEN_SUCCESS = 'WS_OPEN_SUCCESS';
export const WS_CLOSE_SUCCESS = 'WS_CLOSE_SUCCESS';
export const WS_SOCKET_ERROR = 'WS_SOCKET_ERROR';
export const WS_SOCKET_ONMESSAGE = 'WS_SOCKET_ONMESSAGE';
export const WS_SOCKET_ONMESSAGE_PRIVATE = 'WS_SOCKET_ONMESSAGE_PRIVATE';

interface ISocketOpenAction {
  readonly type: typeof WS_SOCKET_OPEN;
}

interface ISocketOpenPrivateAction {
  readonly type: typeof WS_SOCKET_OPEN_PRIVATE;
}

interface ISocketCloseAction {
  readonly type: typeof WS_SOCKET_CLOSE;
}

interface ISocketOpenSuccessAction {
  readonly type: typeof WS_OPEN_SUCCESS;
}

interface ISocketCloseSuccessAction {
  readonly type: typeof WS_CLOSE_SUCCESS;
}

interface ISocketErrorAction {
  readonly type: typeof WS_SOCKET_ERROR;
}

interface ISocketOnmessageAction extends ISocketResponse {
  readonly type: typeof WS_SOCKET_ONMESSAGE;
}

interface ISocketOnmessagePrivateAction {
  readonly type: typeof WS_SOCKET_ONMESSAGE_PRIVATE;
  readonly orders: TOrder[];
}

export interface IWsActions {
  readonly open: typeof WS_SOCKET_OPEN;
  readonly close: typeof WS_SOCKET_CLOSE;
  readonly onOpen: typeof WS_OPEN_SUCCESS;
  readonly onClose: typeof WS_CLOSE_SUCCESS;
  readonly error: typeof WS_SOCKET_ERROR;
  readonly onMessage: typeof WS_SOCKET_ONMESSAGE;
  readonly openPrivate: typeof WS_SOCKET_OPEN_PRIVATE;
  readonly onMessagePrivate: typeof WS_SOCKET_ONMESSAGE_PRIVATE;
}

export type TSocketActions = ISocketOpenAction | ISocketOpenPrivateAction
| ISocketCloseAction | ISocketOpenSuccessAction
| ISocketCloseSuccessAction | ISocketErrorAction
| ISocketOnmessageAction | ISocketOnmessagePrivateAction