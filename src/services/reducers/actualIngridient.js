import { CHOOSE_INGRIDIENT, DELETE_INGRIDIENT, MOVE_INGRIDIENT} from '../actions/actualIngridients.js';
import { ORDER_SUCCES } from '../actions/order.js';
import plug from '../../images/plug.svg';

const initialState = {
  bun: {
    image: plug,
    image_large: plug,
    image_mobile: plug,
    name: "Перетащите булку",
    price: 0,
    type: "bun",
    __v: 0,
    _id: "none"
  },
  ingridients: []
}

export const actualIngridientsReducer = (state = initialState, action) => {
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
      const ingridient = {...action.ingridient};
      ingridient.uniqid = action.uniqid
      let ingridients = [...state.ingridients];
      ingridients.splice(action.sort, 0, ingridient);
      ingridients = ingridients.filter((item) => item.uniqid !== action.ingridient.uniqid);
      ingridients.map((ingridient, index) => ingridient.sort = index + 1);
      return {
        ...state,
        ingridients: ingridients
      }
    }
    case DELETE_INGRIDIENT: {
      const ingridients = [...state.ingridients.filter((item) => item.uniqid !== action.ingridient.uniqid)];
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
      return {...state}
    }
  }
}