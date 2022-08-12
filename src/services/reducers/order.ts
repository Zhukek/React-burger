import { ORDER_ERROR, ORDER_REQUEST, ORDER_SUCCES, TOrderActions} from '../actions/order';

interface IState {
  orderName: string;
  orderNumber: number;
  hasError: boolean;
  isLoading: boolean;
}

const initialState: IState = {
  orderName: '',
  orderNumber: 0,
  hasError: false,
  isLoading: false
}

export const orderReducer = ( state = initialState, action: TOrderActions): IState => {
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
      hasError: true,
      orderName: '',
      orderNumber: 0,
    }
  }
  default: {
    return state
  }
}
}