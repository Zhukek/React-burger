import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngridients from '../burger-ingridients/burger-ingridients.jsx';
import BurgerConstructor from '../burger-contructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';
import IngridientDetails from '../ingridient-details/ingridient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import AppStyles from './app.module.css';
import * as constant from '../../utils/constants.js';
import sort from '../../utils/sort.js';

const App = () => {
  const [ingridients, setIngridients] = React.useState({
    buns: [],
    sauces: [],
    main: []
  });
  const [isLoading, setLoading] = React.useState(true);
  const [isModalOpened, setModalOpen] = React.useState(false);
  const [actualIngridient, setActualIngridient] = React.useState({});
  const [actualModal, setActualModal] = React.useState();

  const checkResonce = (res) => {
    return res.ok ? res.json() : Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`))
  }

  useEffect(() => {
    const getData = () => {
      fetch(constant.url)
        .then(checkResonce)
        .then((ingridients) => sort(ingridients.data))
        .then((list) => {
          const [buns, sauces, main] = list;
          setIngridients({
            buns: buns,
            sauces: sauces,
            main: main
          });
        })
        .catch((err) => {console.log(err)})
        .finally(() => {setLoading(false)})
    }

    getData();
  },[])

  const makeOrder = () => {
    setActualModal('order');
    setModalOpen(true);
  }

  const openIngridient = (ingridient) => {
    setActualIngridient(ingridient);
    setActualModal('ingridient');
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setActualIngridient({});
    setActualModal();
  }

  
  return (
    <div className={AppStyles.app}>
      <AppHeader />
      {!isLoading && 
        <main className={AppStyles.main}>
          <BurgerIngridients buns = {ingridients.buns} sauces = {ingridients.sauces} main = {ingridients.main} openIngridient={openIngridient}/>
          <BurgerConstructor bun = {ingridients.buns[0]} ingridients = {[...ingridients.sauces, ...ingridients.main]} makeOrder = {makeOrder}/>
        </main>
      }

      {isModalOpened && 
        <Modal close={closeModal} title={actualModal === 'ingridient' ? constant.titleIngridients : ''}>
          {actualModal === 'ingridient' && <IngridientDetails actualIngridient={actualIngridient}/>}
          {actualModal === 'order' && <OrderDetails />}
        </Modal>
      }
    </div>
  )
}

export default App;