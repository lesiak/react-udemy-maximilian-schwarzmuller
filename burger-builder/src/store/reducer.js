import * as actionTypes from './actions';

const initialState = {
  ingredients: null,
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGEREDIENT:
      return state;
    case actionTypes.REMOVE_INGEREDIENT:
      return state;
    default:
      return state;
  }
};

export default reducer;
