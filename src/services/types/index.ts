import { rootReducer } from '../reducers/index';
import { ThunkAction } from 'redux-thunk';
import { ThunkDispatch } from 'redux-thunk';
import { TActualIngredientsActions } from '../actions/actualIngridients';
import { TActualModalActions } from '../actions/actualModal';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';
import { TSocketActions } from '../actions/wsSocket';
import { TLoadingActions } from '../actions';

export type TApplicationActions = TActualIngredientsActions | TActualModalActions
| TOrderActions | TUserActions
| TSocketActions | TLoadingActions

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

type TBackground = {
  readonly hash: string;
  readonly key: string;
  readonly pathname: string;
  readonly search: string;
  readonly state: undefined;
};

export interface IAboutOrderProps {
  background?: undefined | TBackground
}