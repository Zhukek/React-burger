import React from "react";
import BurgerMenuStyles from './burger-menu.module.css';
import IngridientCard from "../ingridient-card/ingridient-card";
import { TIngredient } from "../../services/types/data";

interface IBurgerMenu {
  menu: TIngredient[];
  name: string;
}

const BurgerMenu = React.forwardRef<HTMLUListElement, IBurgerMenu>(({menu, name}, ref) => {
  
  return (
    <ul className={BurgerMenuStyles.list} ref={ref}>
        <h3 className={`text text_type_main-medium ${BurgerMenuStyles.sectionName}`}>{name}</h3>
        {menu.map((ingridient) => (
          <IngridientCard ingridient={ingridient} key = {ingridient._id}/>
        ))}
      </ul>
  )
})

export default BurgerMenu