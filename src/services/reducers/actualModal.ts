import { OPEN_ORDER_MODAL, CLOSE_MODAL, TActualModalActions} from '../actions/actualModal';

interface IState {
  isModalOpen: boolean;
  actualModal: string;
}

const initialState: IState = {
  isModalOpen: false,
  actualModal: ''
}

export const modalReducer = (state = initialState, action: TActualModalActions): IState => {
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
      return state
    }
  }
}