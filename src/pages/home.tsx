import React, { FC } from 'react';

import BurgerIngridients from '../components/burger-ingridients/burger-ingridients';
import BurgerConstructor from '../components/burger-contructor/burger-constructor';
import Modal from '../components/modal/modal';
import OrderDetails from '../components/order-details/order-details';
import homeStyles from './home.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useSelector, useDispatch } from '../services/hooks';

import { CLOSE_MODAL } from '../services/actions/actualModal';

export const HomePage: FC = () => {
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