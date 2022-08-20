export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
  uniqid?: string;
  sort?: number;
};

export type TIngredients = {
  readonly buns: TIngredient[];
  readonly sauces: TIngredient[];
  readonly main: TIngredient[];
}

export type TUser = {
  readonly email: string;
  readonly name: string;
};

type TOwner = TUser & {
  readonly createdAt: string;
  readonly updatedAt: string;
};

type TBaseOrder = {
  readonly createdAt: string;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
};

export type TOrder = TBaseOrder & {
  readonly ingredients: string[];
};

export type TOrderResponse = TBaseOrder & {
  readonly ingredients: TIngredient[];
  readonly owner: TOwner;
};

export type TTokenResponse =  {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export type TAuthResponse = TTokenResponse & {
  readonly user: TUser;
}

export type TSetUserRequest = {
  readonly email: string;
  readonly name: string;
  readonly password: string | null;
}

export interface ISocketResponse {
  readonly success?: boolean;
  readonly total: number;
  readonly totalToday: number;
  readonly orders: TOrder[];
}