export const OPEN_ORDER_MODAL: 'OPEN_ORDER_MODAL' = 'OPEN_ORDER_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';

interface IOpenOrderModalAction {
  readonly type: typeof OPEN_ORDER_MODAL;
}

interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL
}

export type TActualModalActions = IOpenOrderModalAction | ICloseModalAction