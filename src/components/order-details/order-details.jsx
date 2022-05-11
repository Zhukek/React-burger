import React from "react";
import OrderDetailsStyles from "./order-details.module.css";
import doneImagePath from "../../images/done.svg";

const OrderDetails = () => {
  
  return (
    <div className={OrderDetailsStyles.order}>
      <h4 className="text text_type_digits-large mb-8">123456</h4>
      <span className="text text_type_main-medium">идентификатор заказа</span>
      <img className={OrderDetailsStyles.doneImage} src={doneImagePath} alt="done"/>
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;