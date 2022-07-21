import { url } from "./constants.js";

const checkResponce = (res, message = '') => {
  return res.ok ? res.json() : Promise.reject({
    error: res.status,
    message: message
  })
}

export function getIngridients() {
  return fetch(`${url}ingredients`)
    .then(checkResponce)
}

export function sendOrder(ingridientsID, token) {
  return fetch(`${url}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify(ingridientsID)
  })
    .then(checkResponce)
}

function sendPost(secondaryURL, bodyInner) {
  return fetch(url + secondaryURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyInner)
  })
  .then(checkResponce)
}

export function passResetRequest(email) {
  return sendPost('password-reset', {"email": email})
}

export function resetPassword(password, token) {
  return sendPost('password-reset/reset', {
    "password": password,
    "token": token
  })
}

export function register(email, password, userName) {
  return sendPost('auth/register', {
    "email": email, 
    "password": password, 
    "name": userName
  })
}

export function loginRequest(email, password) {
  return sendPost('auth/login', {
    "email": email,
    "password": password
  })
}

export function getUser(authToken) {
  return fetch(url + 'auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
  })
  .then((res) => checkResponce(res, 'getUser'))
}

export function refreshRequest(token) {
  return sendPost('auth/token', {token: token})
}

export function logoutRequest(token) {
  return sendPost('auth/logout', {token: token})
}

export function setUserRequest(authToken, bodyInner) {
  return fetch(url + 'auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
    body: JSON.stringify(bodyInner)
  })
  .then(checkResponce)
}