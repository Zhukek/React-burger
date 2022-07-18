import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './styles.module.css';

const AboutOrderIngredient = ({ingredient, counter}) => {

  return (
    <li className={styles.ingredient}>
      <div style={{backgroundImage: `url(${ingredient.image})`}} className={styles.image}></div>
      <p className={`text text_type_main-default ${styles.name}`}>{ingredient.name}</p>
      <div className={styles.sum}>
        <p className="text text_type_digits-default">{counter} X {ingredient.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </li>
  )
}

export default AboutOrderIngredient