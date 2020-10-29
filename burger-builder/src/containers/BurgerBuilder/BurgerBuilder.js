import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/Hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isUserAuthenticated = useSelector((state) => state.auth.token !== null);

  const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
  const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const isPurchasable = (ingredients) => {
    const sumAmount = Object.entries(ingredients)
      .map(([_ingr, amount]) => amount)
      .reduce((sum, el) => sum + el, 0);
    return sumAmount > 0;
  };

  const purchaseHandler = () => {
    if (isUserAuthenticated) {
      setPurchasing(true);
    } else {
      onSetRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = () =>
    Object.fromEntries(Object.entries(ingredients).map(([ingr, amount]) => [ingr, amount <= 0]));
  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {!ingredients ? (
          <Spinner />
        ) : (
          <OrderSummary
            ingredients={ingredients}
            onPurchaseCancelled={purchaseCancelHandler}
            onPurchaseContinue={purchaseContinueHandler}
            totalPrice={totalPrice}
          />
        )}
      </Modal>
      {ingredients ? (
        <>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabledInfo={disabledInfo()}
            totalPrice={totalPrice}
            purchasable={isPurchasable(ingredients)}
            orderClicked={purchaseHandler}
            isUserAuthenticated={isUserAuthenticated}
          />
        </>
      ) : error ? (
        <p>Ingredients can't be loaded</p>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
