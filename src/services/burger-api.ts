import { url } from "./constants";
import { TIngredient, TOrderResponse, TUser, TTokenResponse, TAuthResponse, TSetUserRequest } from './types/data';

const checkResponse = <T>(res: Response, message: string = ''): Promise<T> => {
  return res.ok ? res.json() : Promise.reject({
    error: res.status,
    message: message
  })
}

interface IIngredientsResponse {
  readonly data: TIngredient[];
  readonly success: boolean;
}

export const getIngridients = () => {
  return fetch(`${url}ingredients`)
  .then(res => checkResponse<IIngredientsResponse>(res))
}

interface IOrderResponse {
  readonly name: string;
  readonly success: boolean;
  readonly order: TOrderResponse;
}

export function sendOrder(ingridientsID: {'ingredients': string[]}, token: string) {
  return fetch(`${url}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify(ingridientsID)
  })
    .then(res => checkResponse<IOrderResponse>(res))
}

const sendPost = <RES, REQ>(secondaryURL: string, bodyInner: REQ) => {
  return fetch(url + secondaryURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyInner)
  })
  .then(res => checkResponse<RES>(res))
}

interface IResetResponse {
  readonly success: boolean;
  readonly message: string;
}

interface IResetRequest {
  readonly "email": string;
}

export function passResetRequest(email: string) {
  return sendPost<IResetResponse, IResetRequest>('password-reset', {"email": email})
}

interface IPasswordReset {
  readonly "password": string;
  readonly "token": string;
}

export function resetPassword(password: string, token: string) {
  return sendPost<IResetResponse, IPasswordReset>('password-reset/reset', {
    "password": password,
    "token": token
  })
}

interface ILoginRequest {
  readonly "password": string;
  readonly "email": string;
}

interface IRegRequest extends ILoginRequest {
  readonly "name": string;
}

export function register(email: string, password: string, userName: string) {
  return sendPost<TAuthResponse, IRegRequest>('auth/register', {
    "email": email, 
    "password": password, 
    "name": userName
  })
}

export function loginRequest(email: string, password: string) {
  return sendPost<TAuthResponse, ILoginRequest>('auth/login', {
    "email": email,
    "password": password
  })
}

interface IGetUserResponse {
  readonly user: TUser;
  readonly success: boolean;
}

export function getUser(authToken: string) {
  return fetch(url + 'auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
  })
  .then((res) => checkResponse<IGetUserResponse>(res, 'getUser'))
}

export function refreshRequest(token: string) {
  return sendPost<TTokenResponse, {token: string}>('auth/token', {token: token})
}

interface ILogoutResponse extends IResetResponse {}

export function logoutRequest(token: string) {
  return sendPost<ILogoutResponse , {token: string}>('auth/logout', {token: token})
}

interface ISetUserResponse {
  readonly success: boolean;
  readonly user: TUser;
}

export function setUserRequest(authToken: string, bodyInner: TSetUserRequest) {
  return fetch(url + 'auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
    body: JSON.stringify(bodyInner)
  })
  .then(res => checkResponse<ISetUserResponse>(res))
}