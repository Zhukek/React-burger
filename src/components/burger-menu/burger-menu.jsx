import React from "react";
import BurgerMenuStyles from './burger-menu.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const BurgerMenu = (props) => {
  return (
    <ul className={BurgerMenuStyles.list}>
        <h3 className={`text text_type_main-medium ${BurgerMenuStyles.sectionName}`}>{props.name}</h3>
        {props.menu.map((ingridient) => (
          <li className={BurgerMenuStyles.ingridient} key = {ingridient._id}>
            <img className={BurgerMenuStyles.ingridientIcon} src={ingridient.image}></img>
            <div className={BurgerMenuStyles.price}>
              <span className="text text_type_digits-default">{ingridient.price}</span>
              <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default ${BurgerMenuStyles.ingridientName}`}>{ingridient.name}</p>
          </li>
        ))}
      </ul>
  )
}

BurgerMenu.propTypes = {
  menu: PropTypes.array,
  name: PropTypes.string
}

export default BurgerMenu