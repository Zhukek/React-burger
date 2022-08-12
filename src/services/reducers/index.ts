import { combineReducers } from "redux";
import { GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_REQUEST_SUCCES, GET_INGRIDIENTS_REQUEST_FAIL, TLoadingActions} from '../actions/index';
import { modalReducer } from './actualModal';
import { actualIngridientsReducer } from './actualIngridient';
import { orderReducer } from './order';
import { userReducer } from "./user";
import { wsSocketReducer } from "./wsSocket";
import { TIngredients } from '../types/data'

interface IState {
  ingridients: TIngredients;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IState = {
  ingridients: {
    buns: [],
    sauces: [],
    main: []
  },
  isLoading: false,
  hasError: false,
};

const loadingReducer = (state = initialState, action: TLoadingActions): IState => {
  switch (action.type) {
    case GET_INGRIDIENTS_REQUEST: {
      return {...state, isLoading: true};
    };
    case GET_INGRIDIENTS_REQUEST_SUCCES: {
      return {...state, ingridients: action.ingridients, isLoading: false};
    };
    case GET_INGRIDIENTS_REQUEST_FAIL: {
      return {...state, isLoading: false, hasError: true}
    }
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  loading: loadingReducer,
  modal: modalReducer,
  burgerConstruct: actualIngridientsReducer,
  order: orderReducer,
  user: userReducer,
  socket: wsSocketReducer
})