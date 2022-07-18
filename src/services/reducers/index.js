import { combineReducers } from "redux";
import { GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_REQUEST_SUCCES, GET_INGRIDIENTS_REQUEST_FAIL} from '../actions/index.js';
import { modalReducer } from './actualModal.js';
import { actualIngridientsReducer } from './actualIngridient.js';
import { orderReducer } from './order.js';
import { userReducer } from "./user.js";
import { wsSocketReducer } from "./wsSocket.js";

const initialState = {
  ingridients: {
    buns: [],
    sauces: [],
    main: []
  },
  isLoading: false,
  hasError: false,
};

const loadingReducer = (state = initialState, action) => {
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