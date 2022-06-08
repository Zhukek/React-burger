import { url } from "./constants.js";

const checkResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`))
}

export function getIngridients() {
  return fetch(`${url}ingredients`)
    .then(checkResponce)
}

export function sendOrder(ingridientsID) {
  return fetch(`${url}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ingridientsID)
  })
    .then(checkResponce)
}