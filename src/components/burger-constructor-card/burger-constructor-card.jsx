import React, { useRef } from "react";
import burgerConstructorCardStyle from "./burger-constructor-card.module.css";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { DELETE_INGRIDIENT, MOVE_INGRIDIENT } from '../../services/actions/actualIngridients.js';
import { useDrag, useDrop } from "react-dnd";
import uniqid from 'uniqid';

const BurgerConstructorCard = ({ingridient}) => {
  const dispatch = useDispatch();
  
  const [ ,dragRef] = useDrag({
    type: 'replacingIngridient',
    item: ingridient
  })

  const ref = useRef(null);

  const [ ,dropRef] = useDrop({
    accept: 'replacingIngridient',
    
    drop(item, monitor) {
      if (item.uniqid === ingridient.uniqid) {
        return
      }
      const elementMiddle = (ref.current.getBoundingClientRect().bottom + ref.current.getBoundingClientRect().top) / 2
      const itemOffset = monitor.getClientOffset().y;
      
      if (elementMiddle - itemOffset < 0) {
        const id = uniqid()
        dispatch({
          type: MOVE_INGRIDIENT,
          sort: ingridient.sort,
          ingridient: item,
          uniqid: id
        })
      }
      if (elementMiddle - itemOffset > 0) {
        const id = uniqid()
        dispatch({
          type: MOVE_INGRIDIENT,
          sort: ingridient.sort - 1,
          ingridient: item,
          uniqid: id
        })
      }
    }
  })
  dragRef(dropRef(ref))

  return (
    <li ref={ref} className={`${burgerConstructorCardStyle.constructor__ingridient} mr-1`}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={ingridient.name}
        price={ingridient.price}
        thumbnail={ingridient.image}
        handleClose={() => {dispatch({
          type: DELETE_INGRIDIENT,
          ingridient: ingridient
        })}}
      />
    </li>
  )
}

export default BurgerConstructorCard