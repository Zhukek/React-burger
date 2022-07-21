import React, { useMemo } from "react";
import IngridientCardStyles from './ingridient-card.module.css';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";


const IngridientCard = ({ingridient}) => {
  const location = useLocation();
  const actualIngridients = useSelector(store => store.burgerConstruct);
  
  const counter = useMemo(() => {
    const ingridientsList = [actualIngridients.bun, ...actualIngridients.ingridients];
    const selectedIngridients = ingridientsList.filter((current) => current._id === ingridient._id);
    return selectedIngridients.length
  },[actualIngridients])

  const [ ,dragref] = useDrag({
    type: 'ingridient',
    item: ingridient
  })  

  return (
    <li className={IngridientCardStyles.ingridient} ref={dragref}>
      <Link className={IngridientCardStyles.link} to={{pathname: `/ingredients/${ingridient._id}`, state: {background: location}}}>
        <img className={IngridientCardStyles.ingridientIcon} src={ingridient.image} alt={ingridient.name} />
        <div className={IngridientCardStyles.price}>
          <span className="text text_type_digits-default">{ingridient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${IngridientCardStyles.ingridientName}`}>{ingridient.name}</p>
        {counter > 0 && <Counter count={counter} size="default"/>}
      </Link>
    </li>
  )
}

export default IngridientCard