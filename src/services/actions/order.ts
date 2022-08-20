import { sendOrder } from '../burger-api';
import { OPEN_ORDER_MODAL } from './actualModal';
import { AppThunk } from '../types';

export const ORDER_ERROR: 'ORDER_ERROR' = 'ORDER_ERROR';
export const ORDER_REQUEST: 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const ORDER_SUCCES: 'ORDER_SUCCES' = 'ORDER_SUCCES';

export interface IOrderSuccessAction {
  readonly type: typeof ORDER_SUCCES;
  readonly orderName: string;
  readonly orderNumber: number;
}

interface IOrderRequestAction {
  readonly type: typeof ORDER_REQUEST;
}

interface IOrderErrorAction {
  readonly type: typeof ORDER_ERROR;
}

export type TOrderActions = IOrderErrorAction | IOrderRequestAction | IOrderSuccessAction;

export const makeOrder = (ingridientsID: {'ingredients': string[]}, token: string): AppThunk<Promise<unknown>> => {
    return function(dispatch) {
      dispatch({
        type: ORDER_REQUEST
      })
      dispatch({
        type: OPEN_ORDER_MODAL
      })
      return sendOrder(ingridientsID, token)
      .then((data) => {
        dispatch({
          type: ORDER_SUCCES,
          orderNumber: data.order.number,
          orderName: data.name
        })
      })
      .catch(() => {
        dispatch({
          type: ORDER_ERROR
        })
      })
    }
  }