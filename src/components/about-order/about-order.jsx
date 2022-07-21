import React, { useEffect, useCallback } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDate, getIngridients } from "../../services/order-functions";

import AboutOrderIngredient from "../about-order-ingredient/about-order-ingredient";
import styles from './styles.module.css';

const AboutOrder = ({isPrivate}) => {
  const params = useParams();
  const {ordersPrivate} = useSelector(store => store.socket);
  const commonOrders = useSelector(store => store.socket.orders);
  const {buns, sauces, main} = useSelector(store => store.loading.ingridients);
  const allIngredients = [...buns, ...sauces, ...main];
  const orders = isPrivate ? ordersPrivate : commonOrders;
  const order = orders.find((item) => item._id === params.id);
  let date, sum, ingredientsSortedList, ingredientsList

  const getDateCallback = useCallback((order) => {
    if (order) {
      return getDate(order)
    }
  },[order?.createdAt])
  const getIngridientsCallback = useCallback((order, allIngredients) => {
    if (order && allIngredients) {
      let {sum, ingredientsList} =  getIngridients(order, allIngredients)
      const ingredientsSortedList = [...new Set(ingredientsList)];
      if (ingredientsList[0].type === 'bun') {
        ingredientsList.push(ingredientsList[0])
      }
      return {
        sum: sum,
        ingredientsSortedList: ingredientsSortedList,
        ingredientsList: ingredientsList
      }
    }
  },[order?.ingredients, allIngredients])

  if (order) {
    date = getDateCallback(order);
    ({sum, ingredientsSortedList, ingredientsList} = getIngridientsCallback(order, allIngredients));
  }

  if (orders.length === 0 || allIngredients.length === 0) {
    return null
  }

  return (
    <div className={styles.main}>
      <p className="text text_type_digits-medium mb-10">#{order.number}</p>
      <p className="text text_type_main-medium mb-3">{order.name}</p>
      <p className={`text text_type_main-default ${styles.status}`}>{order.status === 'done' ? 'Выполнен' : 'Выполняется'}</p>
      <p className={`text text_type_main-medium mb-6 ${styles.composition}`}>Состав:</p>
      <ul className={styles.ingredients}>
        {ingredientsSortedList.map(ingredient => {
          const selected = ingredientsList.filter((current) => current._id === ingredient._id)
          const counter = selected.length
          return <AboutOrderIngredient key={ingredient._id} ingredient={ingredient} counter={counter}/>
        })}
      </ul>
      <div className={styles.footer}>
      <span className="text text_type_main-default text_color_inactive">{date}</span>
        <span className="text text_type_digits-medium">
          {sum} &nbsp;
          <CurrencyIcon type="primary"/>
        </span>
      </div>
    </div>
  )
}

export default AboutOrder