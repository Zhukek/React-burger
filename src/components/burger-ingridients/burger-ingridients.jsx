import React, { useRef } from "react";
import BurgerIngredientsStyles from './burger-ingridients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerMenu from "../burger-menu/burger-menu";
import { useSelector } from "react-redux";

const BurgerIngridients = () => {
  const [current, setCurrent] = React.useState('buns');
  const {buns, sauces, main } = useSelector(store => store.loading.ingridients);

  const menu = useRef(null);
  const menuBuns = useRef(null);
  const menuSauces = useRef(null);
  const menuMain = useRef(null);

  const onScroll = () => {
    const saucesX = menuBuns.current.offsetHeight;
    const mainX = menuSauces.current.offsetHeight + saucesX;
    const menuScroll = menu.current.scrollTop;

    if (menuScroll >= mainX) {
      setCurrent('main')
    } else if (menuScroll >= saucesX) {
      setCurrent('sauces')
    } else {
      setCurrent('buns')
    }
  }

  const scrollTo = (value) => {
    setCurrent(value)
    let section
    switch (value) {
      case 'buns':
        section = menuBuns.current;
        break;
      case 'sauces':
        section = menuSauces.current;
        break;
      case 'main':
        section = menuMain.current;
        break;
    }
    const scrolloption = { behavior: 'smooth'}
    section.scrollIntoView(scrolloption)
  }

  return (
    <section className={BurgerIngredientsStyles.main}>
      <h2 className={`text text_type_main-large ${BurgerIngredientsStyles.title}`}>Соберите бургер</h2>
      <div className={BurgerIngredientsStyles.tabContainer}>
      <Tab value="buns" active={current === 'buns'} onClick={scrollTo}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === 'sauces'} onClick={scrollTo}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={scrollTo}>
        Начинки
      </Tab>
    </div>
    <div className={BurgerIngredientsStyles.menu} ref={menu} onScroll={onScroll}>
      <BurgerMenu name = "Булки" menu = {buns} ref={menuBuns} />
      <BurgerMenu name = "Соусы" menu = {sauces} ref={menuSauces} />
      <BurgerMenu name = "Начинки" menu = {main} ref={menuMain} />
    </div>
    </section>
  )
}

export default BurgerIngridients;