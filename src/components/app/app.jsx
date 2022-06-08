import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngridients from '../burger-ingridients/burger-ingridients.jsx';
import BurgerConstructor from '../burger-contructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';
import IngridientDetails from '../ingridient-details/ingridient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import AppStyles from './app.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useSelector, useDispatch } from 'react-redux';
import { loadIngridients } from '../../services/actions/index.js';

import { titleIngridients } from '../../services/constants.js';

const App = () => {
  const dispatch = useDispatch();

  const {isLoading, hasError, ingridients} = useSelector(store => store.loading);
  const {actualModal, isModalOpen} = useSelector(store => store.modal);

  useEffect(() => {
    dispatch(loadIngridients())
  },[])
  
  return (
    <div className={AppStyles.app}>
      <AppHeader />
        <DndProvider backend={HTML5Backend}>
          {!isLoading && !hasError && ingridients.buns.length !== 0 &&
            <main className={AppStyles.main}>
              <BurgerIngridients />
              <BurgerConstructor />
            </main>
          }
        </DndProvider>

        {isModalOpen && 
          <Modal title={actualModal === 'ingridient' ? titleIngridients : ''}>
            {actualModal === 'ingridient' && <IngridientDetails />}
            {actualModal === 'order' && <OrderDetails />}
          </Modal>
        }
    </div>
  )
}

export default App;