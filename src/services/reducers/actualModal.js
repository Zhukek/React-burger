import { OPEN_ORDER_MODAL, OPEN_INGRIDIENT_MODAL, CLOSE_MODAL, ORDER_HAS_ERROR} from '../actions/actualModal.js';

const initialState = {
  isModalOpen: false,
  actualModal: '',
  actualIngridient: {}
}

export const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isModalOpen: true,
        actualModal: 'order',
      }
    }
    case OPEN_INGRIDIENT_MODAL: {
      return {
        ...state,
        isModalOpen: true,
        actualModal: 'ingridient',
        actualIngridient: action.ingridient
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isModalOpen: false,
        actualModal: '',
        actualIngridient: {}
      }
    }
    default: {
      return {...state}
    }
  }
}