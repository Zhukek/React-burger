import { sendOrder } from '../burger-api.js';

export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const OPEN_INGRIDIENT_MODAL = 'OPEN_INGRIDIENT_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const ORDER_HAS_ERROR = 'ORDER_HAS_ERROR';

export function makeOrder(ingridientsID) {
  return function(dispatch) {
    sendOrder(ingridientsID)
    .then((data) => {
      dispatch({
        type: OPEN_ORDER_MODAL,
        orderNumber: data.order.number,
        orderName: data.name
      })
    })
    .catch(() => {
      dispatch({
        type: ORDER_HAS_ERROR
      })
    })
  }
}