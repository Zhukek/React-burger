import { getIngridients } from '../burger-api';
import sort from '../sort';
import { TIngredients } from '../types/data';
import { AppThunk } from '../types';

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_REQUEST_SUCCES = 'GET_INGRIDIENTS_REQUEST_SUCCES';
export const GET_INGRIDIENTS_REQUEST_FAIL = 'GET_INGRIDIENTS_REQUEST_FAIL';

interface IGetRequestAction {
  readonly type: typeof GET_INGRIDIENTS_REQUEST;
}

interface IGetRequestSuccessAction {
  readonly type: typeof GET_INGRIDIENTS_REQUEST_SUCCES;
  readonly ingridients: TIngredients;
}

interface IGetRequestFailAction {
  readonly type: typeof GET_INGRIDIENTS_REQUEST_FAIL;
}

export type TLoadingActions = IGetRequestAction | IGetRequestSuccessAction | IGetRequestFailAction;

export const loadIngridients = (): AppThunk<Promise<unknown>> => {
  return function(dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST
    });
    return getIngridients()
      .then((ingridients) => sort(ingridients.data))
      .then((list) => {
        const {buns, sauces, main} = list;
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