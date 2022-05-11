import React from "react";
import IngridientDetailsStyles from './ingridient-details.module.css';
import PropTypes from 'prop-types';
import { ingridientDataType } from "../../utils/constants.js";

const IngridientDetails = (props) => {

  return (
    <div className={IngridientDetailsStyles.main}>
      <img className={IngridientDetailsStyles.image} 
        src={props.actualIngridient.image_large}
        alt={props.actualIngridient.name}/>
      <h4 className={`mt-4 mb-8 text text_type_main-medium ${IngridientDetailsStyles.name}`}>{props.actualIngridient.name}</h4>
      <ul className={IngridientDetailsStyles.infoList}>
        <li className={IngridientDetailsStyles.infoItem}>
          <p className="mb-2 text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{props.actualIngridient.calories}</p>
        </li>
        <li className={IngridientDetailsStyles.infoItem}>
          <p className="mb-2 text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.actualIngridient.proteins}</p>
        </li>
        <li className={IngridientDetailsStyles.infoItem}>
          <p className="mb-2 text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.actualIngridient.fat}</p>
        </li>
        <li className={IngridientDetailsStyles.infoItem}>
          <p className="mb-2 text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.actualIngridient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngridientDetails.propTypes = {
  actualIngridient: PropTypes.shape(ingridientDataType).isRequired
}

export default IngridientDetails;