import { loginRequest, register, getUser, refreshRequest, logoutRequest, setUserRequest } from "../burger-api";
import { setCookie, getCookie, deleteCookie } from "../cookies";
import { TUser, TAuthResponse, TSetUserRequest } from "../types/data";
import { AppThunk } from "../types";

export const LOGIN_IN: 'LOGIN_IN' = 'LOGIN_IN';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_ERROR: 'LOGIN_ERROR' = 'LOGIN_ERROR';
export const REGISTRATION_ERROR: 'REGISTRATION_ERROR' = 'REGISTRATION_ERROR';
export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';
export const CHANGE_PAGE: 'CHANGE_PAGE' = 'CHANGE_PAGE';
export const OPEN_RESET_PAGE: 'OPEN_RESET_PAGE' = 'OPEN_RESET_PAGE';
export const UPDATE_USER: 'UPDATE_USER' = 'UPDATE_USER';
export const UPDATE_TOKEN: 'UPDATE_TOKEN' = 'UPDATE_TOKEN';
export const LOGOUT: 'LOGOUT' = 'LOGOUT';

export interface IError {
  error: number;
  message: string;
}

interface ILoginAction {
  readonly type: typeof LOGIN_IN;
}

interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly token: string;
  readonly user: TUser;
}

interface ILoginErrorAction {
  readonly type: typeof LOGIN_ERROR;
  readonly error: IError;
}

interface IRegistrationErrorAction {
  readonly type: typeof REGISTRATION_ERROR;
  readonly error: IError;
}

interface IResetPasswordAction {
  readonly type: typeof RESET_PASSWORD;
}

interface IChangePageAction {
  readonly type: typeof CHANGE_PAGE;
}

interface IOpenResetPageAction {
  readonly type: typeof OPEN_RESET_PAGE;
}

interface IUpdateUserAction {
  readonly type: typeof UPDATE_USER;
  readonly user: TUser;
}

interface IUpdateTokenAction {
  readonly type: typeof UPDATE_TOKEN;
  readonly token: string;
}

interface ILogoutAction {
  readonly type: typeof LOGOUT;
}

export type TUserActions = ILoginAction | ILoginSuccessAction
| ILoginErrorAction | IRegistrationErrorAction
| IResetPasswordAction | IChangePageAction
| IOpenResetPageAction | IUpdateUserAction
| IUpdateTokenAction | ILogoutAction

const dispatchUserToken = (data: TAuthResponse): AppThunk => {
  return function(dispatch) {
    if(data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
        user: data.user,
        token: data.accessToken
      })
    }
  }
}

function updateUser (accessToken: string): AppThunk<Promise<unknown>> {
  return function(dispatch) {
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
}

function signOut(): AppThunk {
  return function(dispatch) {
    dispatch({
      type: LOGOUT
    })
    deleteCookie('tokenToRefresh')
  }
}

export function login(email: string, password: string): AppThunk<Promise<unknown>> {
  return function(dispatch) {
    dispatch({
      type: LOGIN_IN
    })
    return loginRequest(email, password)
      .then((data) => {
        dispatch(dispatchUserToken(data));
        setCookie('tokenToRefresh', data.refreshToken, {path: '/'});
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_ERROR,
          error: err
        })
      })
  }
}

export function registration(email: string, password: string, username: string): AppThunk<Promise<unknown>> {
  return function(dispatch) {
    dispatch({
      type: LOGIN_IN
    })
    return register(email, password, username)
    .then((data) => {
      dispatch(dispatchUserToken(data));
      setCookie('tokenToRefresh',data.refreshToken, {path: '/'});
    })
    .catch((err) => {
      dispatch({
        type: REGISTRATION_ERROR,
        error: err
      })
    })
  }
}

export function getUserInfo(accessToken: string = ''): AppThunk<Promise<unknown>> {
  return function(dispatch) {
    return dispatch(updateUser(accessToken))
      .catch((err) => {
          if(err.message === 'getUser' && getCookie('tokenToRefresh') !== '') {
            dispatch(refreshToken());
          } else {
            dispatch(signOut())
          }
      })
  }
}

export function refreshToken(): AppThunk<Promise<unknown>> {
  const token: string = getCookie('tokenToRefresh');
  return function(dispatch) {
    return refreshRequest(token)
      .then((data) => {
        if(data.success) {
          dispatch({
            type: UPDATE_TOKEN,
            token: data.accessToken
          })
          setCookie('tokenToRefresh',data.refreshToken, {path: '/'});
          dispatch(updateUser(data.accessToken))
        }
      })
      .catch(() => {
        dispatch(signOut())
      })
  }
}

export function logout(): AppThunk<Promise<unknown>> {
  return function(dispatch) {
    const token: string = getCookie('tokenToRefresh');
    return logoutRequest(token)
      .then((res) => {
        if(res.success) {
          dispatch(signOut())
        }
      })
  }
}

export function patchUser(token: string = '', bodyInner: TSetUserRequest): AppThunk<Promise<unknown>> {
  return function(dispatch) {
    return setUserRequest(token, bodyInner)
    .then((data) => {
      if (data.success) {
        dispatch({
          type: UPDATE_USER,
          user: data.user
        })
      }
    })
    .catch(() => {
      if(getCookie('tokenToRefresh') !== '') {
        dispatch(refreshToken());
      } else {
        dispatch(signOut())
      }
    })
  }
}