import { OPEN_ORDER_MODAL, CLOSE_MODAL} from '../actions/actualModal.js';

const initialState = {
  isModalOpen: false,
  actualModal: ''
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
    case CLOSE_MODAL: {
      return {
        ...state,
        isModalOpen: false,
        actualModal: ''
      }
    }
    default: {
      return {...state}
    }
  }
}