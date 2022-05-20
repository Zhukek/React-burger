import React, { useEffect } from "react";
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { ActualIngridientsContext } from "../../utils/actualIngridientsContext";

const BurgerConstructor = (props) => {
  const [actualIngridients, setActualIngridients] = React.useContext(ActualIngridientsContext);
  const bun = actualIngridients.bun[0];          //Булка потом должны быть ттллько одна
  const innerIngridients = [...actualIngridients.sauces, ...actualIngridients.main];
  const ingridientsID = [bun._id, ...innerIngridients.map((ingridient) => {return ingridient._id}), bun._id]
  
  const [total, setTotal] = React.useState(0)
  useEffect(() => {
    let sum = [bun,bun,...innerIngridients].reduce((prev, current) => {return prev + current.price}, 0);
    setTotal(sum);
  },[actualIngridients])

    

  return (
    <section className={burgerConstructorStyles.constructor}>
      <div className={burgerConstructorStyles.constructor__components}>
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
          {innerIngridients.map((ingridient, index) => (
            <li className={`${burgerConstructorStyles.constructor__ingridient} mr-1`} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingridient.name}
                price={ingridient.price}
                thumbnail={ingridient.image}
              />
            </li>
          ))}
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
        <Button type="primary" size="large" onClick={() => {props.makeOrder({"ingredients": ingridientsID})}}>
          Оформить заказ
        </Button>
      </div>
    </section>  
  )
}

BurgerConstructor.propTypes = {
  makeOrder: PropTypes.func.isRequired
}

export default BurgerConstructor