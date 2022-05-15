import React from "react";
import IngridientInfo from "../ingridient-info/ingridient-info";
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
        <IngridientInfo name='Калории,ккал' value={props.actualIngridient.calories} />
        <IngridientInfo name='Белки, г' value={props.actualIngridient.proteins} />
        <IngridientInfo name='Жиры, г' value={props.actualIngridient.fat} />
        <IngridientInfo name='Углеводы, г' value={props.actualIngridient.carbohydrates} />
      </ul>
    </div>
  )
}

IngridientDetails.propTypes = {
  actualIngridient: PropTypes.shape(ingridientDataType).isRequired
}

export default IngridientDetails;