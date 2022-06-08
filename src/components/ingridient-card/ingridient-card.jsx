import React, { useMemo } from "react";
import IngridientCardStyles from './ingridient-card.module.css';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_INGRIDIENT_MODAL } from '../../services/actions/actualModal.js';
import { useDrag } from "react-dnd";


const IngridientCard = ({ingridient}) => {
  const dispatch = useDispatch();

  const actualIngridients = useSelector(store => store.burgerConstruct);
  
  const counter = useMemo(() => {
    const ingridientsList = [actualIngridients.bun, ...actualIngridients.ingridients];
    const selectedIngridients = ingridientsList.filter((current) => current._id === ingridient._id);
    return selectedIngridients.length
  },[actualIngridients])

  const openIngridient = (ingridient) => {
    dispatch({
      type: OPEN_INGRIDIENT_MODAL,
      ingridient: ingridient
    })
  }

  const [ ,dragref] = useDrag({
    type: 'ingridient',
    item: ingridient
  })  

  return (
    <li className={IngridientCardStyles.ingridient} onClick={() => openIngridient(ingridient)} ref={dragref}>
      <img className={IngridientCardStyles.ingridientIcon} src={ingridient.image} alt={ingridient.name} />
      <div className={IngridientCardStyles.price}>
        <span className="text text_type_digits-default">{ingridient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${IngridientCardStyles.ingridientName}`}>{ingridient.name}</p>
      {counter > 0 && <Counter count={counter} size="default"/>}
    </li>
  )
}

export default IngridientCard