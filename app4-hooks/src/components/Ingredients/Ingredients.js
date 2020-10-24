import React, { useReducer, useState, useCallback } from 'react';

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

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients,
    });
  }, []);

  const addIngredientHandler = async (ingredient) => {
    setIsLoading(true);
    const response = await fetch('https://react-hooks-test-6338a.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsLoading(false);
    const responseData = await response.json();
    const newIngredient = { id: responseData.name, ...ingredient };
    dispatch({
      type: 'ADD',
      ingredient: newIngredient,
    });
  };

  const removeIngredientHandler = async (ingredientId) => {
    setIsLoading(true);
    try {
      await fetch(`https://react-hooks-test-6338a.firebaseio.com/ingredients/${ingredientId}.json`, {
        method: 'DELETE',
      });
      setIsLoading(false);
      dispatch({
        type: 'DELETE',
        ingredientId,
      });
    } catch (error) {
      setIsLoading(false);
      setError('Something went wrong: ' + error.message);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error ? <ErrorModal onClose={clearError}>{error}</ErrorModal> : null}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
