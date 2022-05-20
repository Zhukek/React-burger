import PropTypes from 'prop-types';

export const url = 'https://norma.nomoreparties.space/api/ingredients';
export const urlPOST = 'https://norma.nomoreparties.space/api/orders';
export const titleIngridients = 'Детали ингредиента';
export const ingridientDataType = {
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string
  }