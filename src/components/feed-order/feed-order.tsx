import React, { FC, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDate, getIngridients } from "../../services/order-functions";

import styles from './styles.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/hooks";
import { TIngredient, TOrder } from "../../services/types/data";

interface IFeedOrder {
  order: TOrder;
  allIngredients: TIngredient[];
}

const FeedOrder: FC<IFeedOrder> = ({order, allIngredients}) => {
  const location = useLocation();
  const isPrivate = useSelector(store => store.socket.private);

  const getDateCallback = useCallback((order: TOrder) => {
    return getDate(order)
  },[order.createdAt])
  const getIngridientsCallback = useCallback((order: TOrder, allIngredients: TIngredient[]) => {
    return getIngridients(order, allIngredients)
  },[order.ingredients, allIngredients])

  const date = getDateCallback(order);
  const {sum, ingredientsList} = getIngridientsCallback(order, allIngredients);
  
  if (order.ingredients.length === 0 || allIngredients.length === 0) {
    return null
  }

  return (
    <li className={styles.order}>
      <Link className={styles.link} to={{pathname: isPrivate ? `/profile/orders/${order._id}` : `/feed/${order._id}`,
       state: {background: location}}}>
        <div className={styles.orderRow}>
          <span className="text text_type_main-medium">#{order.number}</span>
          <span className="text text_type_main-default text_color_inactive">{date}</span>
        </div>
        <span className="text text_type_main-medium">{order.name}</span>
        <div className={styles.orderRow}>
          <ul className={styles.ingredients}>
            {ingredientsList.length <= 6 ?
              (ingredientsList.map((ingredient, index) => (
                <li key={index} style={{
                  zIndex: ingredientsList.length + 1 - index,
                  backgroundImage: `url(${ingredient.image})` 
                  }}
                  className={styles.ingredient}>
                </li>
              ))) : (
                ingredientsList.map((ingredient, index) => {
                  if (index < 5) {
                    return (
                      <li key={index} style={{
                        zIndex: 6 - index,
                        backgroundImage: `url(${ingredient.image})` 
                        }}
                        className={styles.ingredient}>
                      </li>
                    )
                  } else if (index === 5) {
                    return (
                      <li key={index} style={{
                        backgroundImage: `url(${ingredient.image})` 
                        }}
                        className={styles.ingredientLast}>
                          <span className="text text_type_digits-default">+{ingredientsList.length - 6}</span>
                      </li>
                    )
                  }
                })
              )
            }
          </ul>
          <span className="text text_type_digits-medium">
            {sum} &nbsp;
            <CurrencyIcon type="primary"/>
          </span>
        </div>
      </Link>
    </li>
  )
}

export default FeedOrder