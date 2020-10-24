import React, { useReducer, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter((ing) => ing.id !== action.ingredientId);
    default:
      throw new Error('Should not reach this line');
  }
};

const httpReducer = (prevHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...prevHttpState, error: null };
    default:
      throw new Error('Should not reach this line');
  }
};

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients,
    });
  }, []);

  const addIngredientHandler = async (ingredient) => {
    dispatchHttp({ type: 'SEND' });
    const response = await fetch('https://react-hooks-test-6338a.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatchHttp({ type: 'RESPONSE' });
    const responseData = await response.json();
    const newIngredient = { id: responseData.name, ...ingredient };
    dispatch({
      type: 'ADD',
      ingredient: newIngredient,
    });
  };

  const removeIngredientHandler = async (ingredientId) => {
    dispatchHttp({ type: 'SEND' });
    try {
      await fetch(`https://react-hooks-test-6338a.firebaseio.com/ingredients/${ingredientId}.json`, {
        method: 'DELETE',
      });
      dispatchHttp({ type: 'RESPONSE' });
      dispatch({
        type: 'DELETE',
        ingredientId,
      });
    } catch (error) {
      dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong: ' + error.message });
    }
  };

  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' });
  };

  return (
    <div className="App">
      {httpState.error ? <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal> : null}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
