import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorCard from "../burger-constructor-card/burger-constructor-card";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { makeOrder } from '../../services/actions/order.js';
import { useDrop } from "react-dnd";
import { CHOOSE_INGRIDIENT } from '../../services/actions/actualIngridients.js';
import uniqid from 'uniqid';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {accessToken} = useSelector(store => store.user)

  const orderClick = (IDs, token) => {
    authorized ?
    dispatch(makeOrder(IDs, token)) :
    history.replace({pathname: '/login'});
  }
  const authorized = useSelector(store => store.user.authorization);
  const bun = useSelector(store => store.burgerConstruct.bun);
  const innerIngridients = useSelector(store => store.burgerConstruct.ingridients);
  const [total, setTotal] = React.useState(0);  
   
  const ingridientsID = innerIngridients.length > 0 ? [bun._id, ...innerIngridients.map((ingridient) => {return ingridient._id}), bun._id] : 0;
  
  const cartSum = React.useMemo(
    (() => {
      const ingridients = innerIngridients.length > 0 ? [bun,bun,...innerIngridients] : [bun, bun];
      return ingridients.reduce((prev, current) => {return prev + current.price}, 0);
    }),[bun, innerIngridients.length]
  )

  useEffect(() => {
    setTotal(cartSum);
  },[cartSum])

  const [ , dropRef] = useDrop({
    accept: 'ingridient',
    drop(ingridient) {
      const id = uniqid()
      dispatch({
        type: CHOOSE_INGRIDIENT,
        ingridient: ingridient,
        uniqid: id
      })
    }
  })
  

  return (
    <section className={burgerConstructorStyles.constructor}>
      <div className={burgerConstructorStyles.constructor__components} ref={dropRef}>
        <div className="mr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <ul className={burgerConstructorStyles.constructor__list}>
          {innerIngridients.length > 0 ?
          innerIngridients.map((ingridient, index) => (
            <BurgerConstructorCard ingridient={ingridient} key={index} />
          )) : <p className="text text_type_main-medium mr-10">Перетащите сюда ингридиенты</p>}
        </ul>
        <div className="mr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className = {`${burgerConstructorStyles.order} p-5`}>
        <div className= {burgerConstructorStyles.order__price}>
          <p className="text text_type_digits-medium">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        {bun._id !== 'none' && innerIngridients.length !== 0 &&
        <Button type="primary" size="large" onClick={() => {orderClick({"ingredients": ingridientsID}, accessToken)}}>
          Оформить заказ
        </Button>
        }
      </div>
    </section>  
  )
}


export default BurgerConstructor