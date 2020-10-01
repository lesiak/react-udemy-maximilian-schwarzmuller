import * as actionTypes from '../actions';

const initialState = {
  results: [],
};

const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      console.log('Addind value', action.result);
      return {
        ...state,
        // results: [...state.results, { id: Date.now(), value: action.result }],
        results: state.results.concat({ id: Date.now(), value: action.result }),
      };
    case actionTypes.DELETE_RESULT:
      return {
        ...state,
        results: state.results.filter((res) => res.id !== action.id),
      };
    default:
      return state;
  }
};

export default resultsReducer;
