import { ORDER_ERROR, ORDER_REQUEST, ORDER_SUCCES} from '../actions/order.js';

const initialState = {
  orderName: '',
  orderNumber: 0,
  hasError: false,
  isLoading: false
}

export const orderReducer = ( state = initialState, action) => {
  switch(action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        hasError: false,
        isLoading: true
      }
  }
  case ORDER_SUCCES: {
    return {
      ...state,
      hasError: false,
      isLoading: false,
      orderName: action.orderName,
      orderNumber: action.orderNumber
    }
  }
  case ORDER_ERROR: {
    return {
      ...state,
      isLoading: false,
      hasError: true
    }
  }
  default: {
    return {
      ...state
    }
  }
}
}