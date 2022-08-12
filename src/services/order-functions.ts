import { TOrder, TIngredient } from "./types/data";

export const getDate = (order: TOrder) => {
  const currentDate: Date = new Date();
  const orderDate: Date = new Date(order.createdAt);
  let dateDiff: number =  (Math.floor((Number(currentDate) - Number(orderDate))/(1000*60*60*24)));
  if (plusDay(currentDate, orderDate)) {
    dateDiff += 1;
  }
  let daysAgo: string = '';
  if (dateDiff === 0 ) {
    daysAgo = 'Сегодня'
  } else if (dateDiff === 1) {
    daysAgo = 'Вчера'
  } else if (dateDiff < 5) {
    daysAgo = `${dateDiff} дня назад`
  } else {
    daysAgo = `${dateDiff} дней назад`
  }
  const hours: string = orderDate.getHours() < 10 ? '0' + orderDate.getHours() : String(orderDate.getHours());
  const minutes: string = orderDate.getMinutes() < 10 ? '0' + orderDate.getMinutes() : String(orderDate.getMinutes());

  return `${daysAgo}, ${hours}:${minutes} i-GMT+3`
}

export const getIngridients = (order: TOrder, allIngredients: TIngredient[]) => {
  const list = order.ingredients.map((ingredient) => allIngredients.find(item => item._id === ingredient));
  const bun: TIngredient | undefined = list.find((ingredient) => ingredient?.type === 'bun');
  const ingredientsList: (TIngredient)[] = bun ? [bun] : [];
  list.forEach((ingredient) => {
    if (ingredient?.type === 'sauce' || ingredient?.type === 'main') {
      ingredientsList.push(ingredient)
    }
  })
  const sum: number = ingredientsList.reduce((prev, ingredient) => prev + ingredient.price, bun ? bun.price : 0)
  return {
    sum: sum, 
    ingredientsList: ingredientsList
  }
}

const plusDay = (currentDate: Date, orderDate: Date) => {
  if (currentDate.getHours() - orderDate.getHours() < 0) {
    return true
  } else if (currentDate.getHours() - orderDate.getHours() > 0) {
    return false
  } else if (currentDate.getMinutes() - orderDate.getMinutes() < 0) {
    return true
  } else {
    return false
  }
}