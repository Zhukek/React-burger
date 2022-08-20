import { CHOOSE_INGRIDIENT, DELETE_INGRIDIENT, MOVE_INGRIDIENT, TActualIngredientsActions} from '../actions/actualIngridients';
import { ORDER_SUCCES } from '../actions/order';
import { TIngredient } from '../types/data';
import plug from '../../images/plug.svg';

interface IState {
  bun: TIngredient;
  ingridients: TIngredient[] | [];
}

const initialState: IState = {
  bun: {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: plug,
    image_large: plug,
    image_mobile: plug,
    name: "Перетащите булку",
    price: 0,
    type: "bun",
    __v: 0,
    _id: "none",
    proteins: 0
  },
  ingridients: []
}

export const actualIngridientsReducer = (state = initialState, action: TActualIngredientsActions): IState => {
  switch (action.type) {
    case CHOOSE_INGRIDIENT: {
      if (action.ingridient.type === 'bun') {
        return {
          ...state,
          bun: action.ingridient
        }
      } else {
        const ingridient = {...action.ingridient};
        ingridient.uniqid = action.uniqid;
        ingridient.sort = state.ingridients.length + 1;
        return {
          ...state,
          ingridients: [...state.ingridients, ingridient]
        }
      }
    }
    case MOVE_INGRIDIENT: {
      const ingridient: TIngredient = {...action.ingridient};
      ingridient.uniqid = action.uniqid
      let ingridients: TIngredient[] = [...state.ingridients];
      ingridients.splice(action.sort, 0, ingridient);
      ingridients = ingridients.filter((item: TIngredient) => item.uniqid !== action.ingridient.uniqid);
      ingridients.map((ingridient, index) => ingridient.sort = index + 1);
      return {
        ...state,
        ingridients: ingridients
      }
    }
    case DELETE_INGRIDIENT: {
      const ingridients: TIngredient[] = [...state.ingridients.filter((item: TIngredient) => item.uniqid !== action.ingridient.uniqid)];
      ingridients.map((ingridient, index) => ingridient.sort = index + 1)
      return {
        ...state,
        ingridients: ingridients
      }
    }
    case ORDER_SUCCES: {
      return initialState
    }
    default: {
      return state
    }
  }
}