import React from 'react';

import BurgerIngridients from '../components/burger-ingridients/burger-ingridients.jsx';
import BurgerConstructor from '../components/burger-contructor/burger-constructor.jsx';
import Modal from '../components/modal/modal.jsx';
import OrderDetails from '../components/order-details/order-details.jsx';
import homeStyles from './home.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useSelector, useDispatch } from 'react-redux';

import { CLOSE_MODAL } from '../services/actions/actualModal.js';

export const HomePage = () => {
  const dispatch = useDispatch();

  const {isLoading, hasError, ingridients} = useSelector(store => store.loading);
  const {actualModal, isModalOpen} = useSelector(store => store.modal);

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL
    })
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {!isLoading && !hasError && ingridients.buns.length !== 0 &&
          <main className={homeStyles.main}>
            <BurgerIngridients />
            <BurgerConstructor />
          </main>
        }
      </DndProvider>
      
      {isModalOpen &&
        actualModal === 'order' &&
        <Modal title='' close={closeModal}>
          <OrderDetails />
        </Modal>
      }
    </>
  )
}