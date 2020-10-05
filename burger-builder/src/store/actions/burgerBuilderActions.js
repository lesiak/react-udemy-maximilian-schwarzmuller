import * as actionTypes from './actionTypes';

export const addIngredient = (ingredientName) => {
  return { type: actionTypes.ADD_INGEREDIENT, ingredientName };
};

export const removeIngredient = (ingredientName) => {
  return { type: actionTypes.REMOVE_INGEREDIENT, ingredientName };
};
