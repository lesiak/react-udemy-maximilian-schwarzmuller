import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setIngredients(filteredIngredients);
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
    setIngredients((prevIngredients) => [...prevIngredients, { id: responseData.name, ...ingredient }]);
  };

  const removeIngredientHandler = async (ingredientId) => {
    setIsLoading(true);
    try {
      await fetch(`https://react-hooks-test-6338a.firebaseio.com/ingredients/${ingredientId}.json`, {
        method: 'DELETE',
      });
      setIsLoading(false);
      setIngredients((prevIngredients) => prevIngredients.filter((ing) => ing.id !== ingredientId));
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
