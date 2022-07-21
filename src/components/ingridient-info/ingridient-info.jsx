import React from "react";
import IngridientInfoStyles from './ingridient-info.module.css';

const IngridientInfo = ({name, value}) => {

  return (
    <li className={IngridientInfoStyles.infoItem}>
      <p className="mb-2 text text_type_main-default text_color_inactive">{name}</p>
      <p className="text text_type_digits-default text_color_inactive">{value}</p>
    </li>
  )
}

export default IngridientInfo