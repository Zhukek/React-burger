import React from "react";
import BurgerIngredientsStyles from './burger-ingridients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerMenu from "../burger-menu/burger-menu";

const BurgerIngridients = (props) => {
  const [current, setCurrent] = React.useState('one')
  return (
    <section className={BurgerIngredientsStyles.main}>
      <h2 className={`text text_type_main-large ${BurgerIngredientsStyles.title}`}>Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
    <div className={BurgerIngredientsStyles.menu}>
      <BurgerMenu name = "Булки" menu = {props.buns}/>
      <BurgerMenu name = "Соусы" menu = {props.sauces}/>
      <BurgerMenu name = "Начинки" menu = {props.main}/>
    </div>
    </section>
  )
}

export default BurgerIngridients;