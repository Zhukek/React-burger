export const getDate = (order) => {
  const currentDate = new Date();
  const orderDate = new Date(order.createdAt);
  let dateDiff =  (Math.floor((currentDate - orderDate)/(1000*60*60*24)));
  if (plusDay(currentDate, orderDate)) {
    dateDiff += 1;
  }
  let daysAgo = '';
  if (dateDiff === 0 ) {
    daysAgo = 'Сегодня'
  } else if (dateDiff === 1) {
    daysAgo = 'Вчера'
  } else if (dateDiff < 5) {
    daysAgo = `${dateDiff} дня назад`
  } else {
    daysAgo = `${dateDiff} дней назад`
  }
  const hours = orderDate.getHours() < 10 ? '0' + orderDate.getHours() : orderDate.getHours();
  const minutes = orderDate.getMinutes() < 10 ? '0' + orderDate.getMinutes() : orderDate.getMinutes();

  return `${daysAgo}, ${hours}:${minutes} i-GMT+3`
}

export const getIngridients = (order, allIngredients) => {
  const list = order.ingredients.map((ingredient) => allIngredients.find(item => item._id === ingredient));
  const bun = list.find((ingredient) => ingredient?.type === 'bun');
  const ingredientsList = bun ? [bun] : [];
  ingredientsList.push(...list.filter((ingredient) => ingredient?.type === 'sauce' || ingredient?.type === 'main'))
  const sum = ingredientsList.reduce((prev, ingredient) => prev + ingredient.price, bun ? bun.price : 0)
  return {
    sum: sum, 
    ingredientsList: ingredientsList
  }
}

const plusDay = (currentDate, orderDate) => {
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