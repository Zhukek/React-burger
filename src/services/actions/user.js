import { loginRequest, register, getUser, refreshRequest, logoutRequest, setUserRequest } from "../burger-api";
import { setCookie, getCookie, deleteCookie } from "../cookies";

export const LOGIN_IN = 'LOGIN_IN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const OPEN_RESET_PAGE = 'OPEN_RESET_PAGE';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const LOGOUT = 'LOGOUT';

const dispatchUserToken = (data, dispatch) => {
  if(data.success) {
    dispatch({
      type: LOGIN_SUCCESS,
      user: data.user,
      token: data.accessToken
    })
  }
}

function updateUser (accessToken, dispatch) {
  return getUser(accessToken)
    .then((data) => {
      if (data.success) {
        dispatch({
          type: UPDATE_USER,
          user: data.user
        })
      }
    })
}

function signOut() {
  return function(dispatch) {
    dispatch({
      type: LOGOUT
    })
    deleteCookie('refreshToken')
  }
}

export function login(email, password) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_IN
    })
    loginRequest(email, password)
      .then((data) => {
        dispatchUserToken(data, dispatch);
        setCookie('refreshToken',data.refreshToken);
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_ERROR,
          error: err
        })
      })
  }
}

export function registration(email, password, username) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_IN
    })
    register(email, password, username)
    .then((data) => {
      dispatchUserToken(data, dispatch);
      setCookie('refreshToken',data.refreshToken);
    })
    .catch((err) => {
      dispatch({
        type: REGISTRATION_ERROR,
        error: err
      })
    })
  }
}

export function getUserInfo(accessToken = '') {
  return function(dispatch) {
    updateUser(accessToken, dispatch)
      .catch((err) => {
          if(err.message === 'getUser' && getCookie('refreshToken') !== '') {
            dispatch(refreshToken());
          } else {
            dispatch(signOut())
          }
      })
  }
}

export function refreshToken() {
  const token = getCookie('refreshToken');
  return function(dispatch) {
    refreshRequest(token)
      .then((data) => {
        if(data.success) {
          dispatch({
            type: UPDATE_TOKEN,
            token: data.accessToken
          })
          setCookie('refreshToken',data.refreshToken);
          updateUser(data.accessToken, dispatch)
        }
      })
      .catch(() => {
        dispatch(signOut())
      })
  }
}

export function logout() {
  return function(dispatch) {
    const token = getCookie('refreshToken');
    logoutRequest(token)
      .then((res) => {
        if(res.success) {
          dispatch(signOut())
        }
      })
  }
}

export function patchUser(token = '', bodyInner) {
  return function(dispatch) {
    setUserRequest(token, bodyInner)
    .then((data) => {
      console.log(data)
      if (data.success) {
        dispatch({
          type: UPDATE_USER,
          user: data.user
        })
      }
    })
    .catch(() => {
      if(getCookie('refreshToken') !== '') {
        dispatch(refreshToken());
      } else {
        dispatch(signOut())
      }
    })
  }
}