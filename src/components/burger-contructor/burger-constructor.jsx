import React, { useEffect } from "react";
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { ingridientDataType } from "../../utils/constants.js";

const BurgerConstructor = (props) => {
  const [total, setTotal] = React.useState(0)
  useEffect(() => {
    let sum = 0;
    [props.bun, ...props.ingridients].forEach((ingridient) => {sum += ingridient.price})
    setTotal(sum)
  },[total])
    

  return (
    <section className={burgerConstructorStyles.constructor}>
      <div className={burgerConstructorStyles.constructor__components}>
        <div className="mr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={props.bun.name}
            price={props.bun.price}
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
            text={props.bun.name}
            price={props.bun.price}
            thumbnail={props.bun.image}
          />
        </div>
      </div>
      <div className = {`${burgerConstructorStyles.order} p-5`}>
        <div className= {burgerConstructorStyles.order__price}>
          <p className="text text_type_digits-medium">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={props.makeOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>  
  )
}

BurgerConstructor.propTypes = {
  bun: PropTypes.shape(ingridientDataType).isRequired,
  ingridients: PropTypes.arrayOf(PropTypes.shape(ingridientDataType).isRequired),
  makeOrder: PropTypes.func.isRequired
}

export default BurgerConstructor