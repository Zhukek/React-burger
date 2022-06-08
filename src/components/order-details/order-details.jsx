import React from "react";
import OrderDetailsStyles from "./order-details.module.css";
import PropTypes from 'prop-types';
import doneImagePath from "../../images/done.svg";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const orderNumber = useSelector(store => store.modal.order.orderNumber)
  
  return (
    <div className={OrderDetailsStyles.order}>
      <h4 className="text text_type_digits-large mb-8">{orderNumber}</h4>
      <span className="text text_type_main-medium">идентификатор заказа</span>
      <img className={OrderDetailsStyles.doneImage} src={doneImagePath} alt="done"/>
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number
}

export default OrderDetails;