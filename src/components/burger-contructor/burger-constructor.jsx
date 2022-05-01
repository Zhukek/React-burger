import React from "react";
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {
  return (
    <section className={burgerConstructorStyles.constructor}>
      <div className={burgerConstructorStyles.constructor__components}>
        <div className="mr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={props.bun.image}
          />
        </div>
        <ul className={burgerConstructorStyles.constructor__list}>
          {props.ingridients.map((ingridient, index) => (
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
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={props.bun.image}
          />
        </div>
      </div>
      <div className = {`${burgerConstructorStyles.order} p-5`}>
        <div className= {burgerConstructorStyles.order__price}>
          <p className="text text_type_digits-medium">680</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>  
  )
}

BurgerConstructor.propTypes = {
  bun: PropTypes.object.isRequired,
  ingridients: PropTypes.array
}

export default BurgerConstructor