import { sendOrder } from '../burger-api.js';
import { OPEN_ORDER_MODAL } from './actualModal.js';

export const ORDER_ERROR = 'ORDER_HAS_ERROR';
export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCES = 'ORDER_SUCCES';

export function makeOrder(ingridientsID, token) {
    return function(dispatch) {
      dispatch({
        type: ORDER_REQUEST
      })
      dispatch({
        type: OPEN_ORDER_MODAL
      })
      sendOrder(ingridientsID, token)
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