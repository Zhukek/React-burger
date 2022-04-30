import React from 'react';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngridients from '../burger-ingridients/burger-ingridients.jsx';
import BurgerConstructor from '../burger-contructor/burger-constructor.jsx';
import AppStyles from './app.module.css';
import ingridients from '../../utils/ingidients.js';
import sort from '../../utils/sort.js';

const App = () => {
  const [buns, sauces, main] = sort(ingridients)
  return (
    <div className={AppStyles.app}>
      <AppHeader />
      <main className={AppStyles.main}>
        <BurgerIngridients buns = {buns} sauces = {sauces} main = {main} />
        <BurgerConstructor bun = {buns[0]} ingridients = {[...sauces, ...main]} />
      </main>
    </div>
  )
}

export default App;