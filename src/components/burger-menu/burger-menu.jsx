import React from "react";
import BurgerMenuStyles from './burger-menu.module.css';
import PropTypes from 'prop-types';
import { ingridientDataType } from "../../services/constants.js";
import IngridientCard from "../ingridient-card/ingridient-card";

const BurgerMenu = React.forwardRef((props, ref) => {
  
  return (
    <ul className={BurgerMenuStyles.list} ref={ref}>
        <h3 className={`text text_type_main-medium ${BurgerMenuStyles.sectionName}`}>{props.name}</h3>
        {props.menu.map((ingridient) => (
          <IngridientCard ingridient={ingridient} key = {ingridient._id}/>
        ))}
      </ul>
  )
})

BurgerMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape(ingridientDataType).isRequired),
  name: PropTypes.string.isRequired
}

export default BurgerMenu