import { LOGIN_ERROR, REGISTRATION_ERROR, LOGIN_SUCCESS, LOGIN_IN, CHANGE_PAGE, OPEN_RESET_PAGE, RESET_PASSWORD, 
  UPDATE_USER, UPDATE_TOKEN, LOGOUT } from "../actions/user"

const initialState = {
  authorization: false,
  accessToken: '',
  user: {
    email: '',
    username: ''
  },
  hasLoginError: false,
  hasRegistrationError: false,
  errorType: null,
  isLoading: false,
  passReset: false,
  passResetSuccess: false
}

export const userReducer = (state = initialState,action) => {
  switch (action.type) {
    case LOGIN_IN:
      return {
        ...state,
        hasLoginError: false,
        hasRegistrationError: false,
        errorType: null,
        isLoading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        authorization: true,
        accessToken: action.token,
        user: {
          email: action.user.email,
          username: action.user.name
        },
        isLoading: false,
        passReset: false
      }
    case UPDATE_USER:
      return {
        ...state,
        authorization: true,
        user: {
          email: action.user.email,
          username: action.user.name
        }
      }
    case UPDATE_TOKEN:
      return {
        ...state,
        authorization: true,
        accessToken: action.token
      }
    case LOGIN_ERROR:
      return {
        ...state,
        hasLoginError: true,
        errorType: action.error,
        isLoading: false
      }
      case REGISTRATION_ERROR:
        return {
          ...state,
          hasRegistrationError: true,
          errorType: action.error,
          isLoading: false
        }
      case CHANGE_PAGE:
        return {
          ...state,
          hasLoginError: false,
          hasRegistrationError: false,
          errorType: null,
          passResetSuccess: false
        }
      case OPEN_RESET_PAGE:
        return {
          ...state,
          passReset: true
        }
      case RESET_PASSWORD:
        return {
          ...state,
          passReset: false,
          passResetSuccess: true
        }
      case LOGOUT:
        return {
          ...state,
          authorization: false,
          accessToken: '',
        }
    default:
      return state
  }
}