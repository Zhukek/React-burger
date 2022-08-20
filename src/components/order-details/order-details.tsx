import React, { FC } from "react";
import OrderDetailsStyles from "./order-details.module.css";
import doneImagePath from "../../images/done.svg";
import { useSelector } from "../../services/hooks";
import loader from '../../images/loading.png';

const OrderDetails: FC = () => {
  const {orderNumber, hasError, isLoading} = useSelector(store => store.order)
  if (isLoading) {
    return (
      <>
        <p className={`text text_type_main-medium mt-4 ${OrderDetailsStyles.text}`}>Пожалуйста, подождите</p>
        <p className={`text text_type_main-medium mt-2 ${OrderDetailsStyles.text}`}>Ваш заказ обрабатывается</p>
        <img className={OrderDetailsStyles.loader} src={loader} alt='Loading...'/>
        <p className={`text text_type_main-small mb-8 ${OrderDetailsStyles.text}`}>Это займет 15-20 сеукнд</p>
      </>
    )
  }
  
  return (
    <>
    { !hasError ?
    <div className={OrderDetailsStyles.order}>
      <h4 className="text text_type_digits-large mb-8">{orderNumber}</h4>
      <span className="text text_type_main-medium">идентификатор заказа</span>
      <img className={OrderDetailsStyles.doneImage} src={doneImagePath} alt="done"/>
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
      :
    <p className={`text text_type_main-medium mb-8 ${OrderDetailsStyles.text}`}>Что-то пошло не так</p>
    }
    </>
  )
}

export default OrderDetails;