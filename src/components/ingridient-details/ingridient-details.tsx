import React, { FC, useEffect, useState } from "react";
import IngridientInfo from "../ingridient-info/ingridient-info";
import IngridientDetailsStyles from './ingridient-details.module.css';
import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../services/types/data";

const IngridientDetails: FC = () => {
  const {isLoading, hasError, ingridients} = useSelector(store => store.loading);
  const [actualIngridient, setActualIngridient] = useState<TIngredient>();
  const params = useParams<{id: string}>();
  
  useEffect(() => {
    const ingridientsList = [...ingridients.buns, ...ingridients.sauces, ...ingridients.main];
    const selectedIngridient = ingridientsList.find((ingridient) => ingridient._id === params.id);
    if (!selectedIngridient) {
      return
    }
    setActualIngridient(selectedIngridient);
  },[params, ingridients])

  return (
    <div className={IngridientDetailsStyles.main}>
      {!isLoading && !hasError && actualIngridient &&
      <>
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
      </>
      }
    </div>
  )
}

export default IngridientDetails;