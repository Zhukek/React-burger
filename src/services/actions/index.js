import { getIngridients } from '../burger-api.js';
import sort from '../sort.js';

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_REQUEST_SUCCES = 'GET_INGRIDIENTS_REQUEST_SUCCES';
export const GET_INGRIDIENTS_REQUEST_FAIL = 'GET_INGRIDIENTS_REQUEST_FAIL';

export function loadIngridients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST
    });
    getIngridients()
      .then((ingridients) => sort(ingridients.data))
      .then((list) => {
        const [buns, sauces, main] = list;
        dispatch({
          type: GET_INGRIDIENTS_REQUEST_SUCCES,
          ingridients: {
            buns: buns,
            sauces: sauces,
            main: main
          }
        })
      })
      .catch(() => {
        dispatch({
          type: GET_INGRIDIENTS_REQUEST_FAIL
        })
      })
  }
}