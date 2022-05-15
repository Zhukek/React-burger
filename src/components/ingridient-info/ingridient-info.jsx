import React from "react";
import IngridientInfoStyles from './ingridient-info.module.css';
import PropTypes from 'prop-types';

const IngridientInfo = (props) => {

  return (
    <li className={IngridientInfoStyles.infoItem}>
      <p className="mb-2 text text_type_main-default text_color_inactive">{props.name}</p>
      <p className="text text_type_digits-default text_color_inactive">{props.value}</p>
    </li>
  )
}

IngridientInfo.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default IngridientInfo