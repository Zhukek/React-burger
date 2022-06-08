import React from "react";
import IngridientInfo from "../ingridient-info/ingridient-info";
import IngridientDetailsStyles from './ingridient-details.module.css';
import { useSelector } from "react-redux";

const IngridientDetails = () => {

  const actualIngridient = useSelector(store => store.modal.actualIngridient);

  return (
    <div className={IngridientDetailsStyles.main}>
      <img className={IngridientDetailsStyles.image} 
        src={actualIngridient.image_large}
        alt={actualIngridient.name}/>
      <h4 className={`mt-4 mb-8 text text_type_main-medium ${IngridientDetailsStyles.name}`}>{actualIngridient.name}</h4>
      <ul className={IngridientDetailsStyles.infoList}>
        <IngridientInfo name='Калории,ккал' value={actualIngridient.calories} />
        <IngridientInfo name='Белки, г' value={actualIngridient.proteins} />
        <IngridientInfo name='Жиры, г' value={actualIngridient.fat} />
        <IngridientInfo name='Углеводы, г' value={actualIngridient.carbohydrates} />
      </ul>
    </div>
  )
}

export default IngridientDetails;