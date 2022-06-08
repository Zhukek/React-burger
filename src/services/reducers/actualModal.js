import { OPEN_ORDER_MODAL, OPEN_INGRIDIENT_MODAL, CLOSE_MODAL, ORDER_HAS_ERROR} from '../actions/actualModal.js';

const initialState = {
  isModalOpen: false,
  actualModal: '',
  actualIngridient: {},
  order: {
    orderName: '',
    orderNumber: 0,
    hasError: false
  }
}

export const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isModalOpen: true,
        actualModal: 'order',
        order: {
          orderName: action.orderName,
          orderNumber: action.orderNumber,
          hasError: false
        }
      }
    }
    case ORDER_HAS_ERROR: {
      return {
        ...state,
        isModalOpen: true,
        actualModal: 'order',
        order: {
          orderName: '',
          orderNumber: 0,
          hasError: true
        }
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
        order: {
          orderName: '',
          orderNumber: 0,
          hasError: false
        },
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