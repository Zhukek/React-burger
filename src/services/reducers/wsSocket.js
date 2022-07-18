import { WS_SOCKET_OPEN, WS_OPEN_SUCCESS, WS_CLOSE_SUCCESS, WS_SOCKET_ERROR, WS_SOCKET_ONMESSAGE, 
  WS_SOCKET_OPEN_PRIVATE, WS_SOCKET_ONMESSAGE_PRIVATE } from "../actions/wsSocket";

const initialState = {
  wsConnected: false,
  error: false,
  total: 0,
  today: 0,
  orders: [],
  private: false,
  ordersPrivate: [] 
}

export const wsSocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_OPEN_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: false
      }
    case WS_CLOSE_SUCCESS:
      return {
        ...initialState
      }
    case WS_SOCKET_ONMESSAGE:
      return {
        ...state,
        total: action.total,
        today: action.today,
        orders: action.orders
      }
    case WS_SOCKET_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: true,
      }
    case WS_SOCKET_OPEN:
      return {
        ...state,
        private: false
      }
    case WS_SOCKET_OPEN_PRIVATE:
      return {
        ...state,
        private: true
      }
    case WS_SOCKET_ONMESSAGE_PRIVATE:
      return {
        ...state,
        ordersPrivate: action.orders
      }
    default:
      return state
  }
} 