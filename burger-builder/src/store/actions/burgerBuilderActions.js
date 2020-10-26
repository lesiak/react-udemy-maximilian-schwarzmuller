import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
  return { type: actionTypes.ADD_INGEREDIENT, ingredientName };
};

export const removeIngredient = (ingredientName) => {
  return { type: actionTypes.REMOVE_INGEREDIENT, ingredientName };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get('/ingredients.json')
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((_error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
