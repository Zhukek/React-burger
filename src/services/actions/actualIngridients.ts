import { TIngredient } from "../types/data";
import { IOrderSuccessAction } from "./order";

export const CHOOSE_INGRIDIENT: 'CHOOSE_INGRIDIENT' = 'CHOOSE_INGRIDIENT';
export const DELETE_INGRIDIENT: 'DELETE_INGRIDIENT' = 'DELETE_INGRIDIENT';
export const MOVE_INGRIDIENT: 'MOVE_INGRIDIENT' = 'MOVE_INGRIDIENT';

interface IChooseIngredientAction {
  readonly type: typeof CHOOSE_INGRIDIENT;
  readonly ingridient: TIngredient;
  readonly uniqid: string;
}

interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGRIDIENT;
  readonly ingridient: TIngredient;
}

interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGRIDIENT;
  readonly ingridient: TIngredient;
  readonly uniqid: string;
  readonly sort: number;
}

export type TActualIngredientsActions = IChooseIngredientAction | IDeleteIngredientAction | IMoveIngredientAction | IOrderSuccessAction;