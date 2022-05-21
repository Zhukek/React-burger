import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngridients from '../burger-ingridients/burger-ingridients.jsx';
import BurgerConstructor from '../burger-contructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';
import IngridientDetails from '../ingridient-details/ingridient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import AppStyles from './app.module.css';
import {ActualIngridientsContext} from '../../services/actualIngridientsContext.js';
import * as constant from '../../utils/constants.js';
import * as API from '../../utils/burger-api.js';
import sort from '../../utils/sort.js';

const App = () => {
  const [ingridients, setIngridients] = React.useState({
    buns: [],
    sauces: [],
    main: []
  });
  const [actualIngridients, setActualIngridients] = React.useState({
    bun: null,
    innerIngridients: []
  });
  const [isLoading, setLoading] = React.useState(true);
  const [isModalOpened, setModalOpen] = React.useState(false);
  const [actualIngridient, setActualIngridient] = React.useState({});
  const [actualModal, setActualModal] = React.useState();
  const [orderNumber, setOrdernumber] = React.useState(0);
  const [error, setError] = React.useState();

  useEffect(() => {
    API.getIngridients()
      .then((ingridients) => sort(ingridients.data))
      .then((list) => {
        const [buns, sauces, main] = list;
        setIngridients({
          buns: buns,
          sauces: sauces,
          main: main
        });
        setActualIngridients({      //Потом удалить этот кусок!
          bun: buns[1],
          innerIngridients: [...sauces, ...main]
        });                         //потом удалить этот кусок!
      })
      .catch((err) => {setError(err)})
      .finally(() => {setLoading(false)})
  },[])

  const makeOrder = (ingridientsID) => {
    API.sendOrder(ingridientsID)
      .then((data) => {
        setOrdernumber(data.order.number)
      })
      .catch((err) => {setError(err)})
      .finally(() => {
        setActualModal('order');
        setModalOpen(true);
      })
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
      <ActualIngridientsContext.Provider value={[actualIngridients, setActualIngridients]}>
        {!isLoading && 
          <main className={AppStyles.main}>
            <BurgerIngridients buns = {ingridients.buns} sauces = {ingridients.sauces} main = {ingridients.main} openIngridient={openIngridient}/>
            <BurgerConstructor makeOrder = {makeOrder}/>
          </main>
        }

        {isModalOpened && 
          <Modal close={closeModal} title={actualModal === 'ingridient' ? constant.titleIngridients : ''}>
            {actualModal === 'ingridient' && <IngridientDetails actualIngridient={actualIngridient}/>}
            {actualModal === 'order' && <OrderDetails orderNumber={orderNumber}/>}
          </Modal>
        }
      </ActualIngridientsContext.Provider>
    </div>
  )
}

export default App;