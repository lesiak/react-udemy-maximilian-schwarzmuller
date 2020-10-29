import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
  const { onInitIngredients } = props;
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
    if (props.isUserAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = () =>
    Object.fromEntries(Object.entries(props.ingredients).map(([ingr, amount]) => [ingr, amount <= 0]));
  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {!props.ingredients ? (
          <Spinner />
        ) : (
          <OrderSummary
            ingredients={props.ingredients}
            onPurchaseCancelled={purchaseCancelHandler}
            onPurchaseContinue={purchaseContinueHandler}
            totalPrice={props.totalPrice}
          />
        )}
      </Modal>
      {props.ingredients ? (
        <>
          <Burger ingredients={props.ingredients} />
          <BuildControls
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabledInfo={disabledInfo()}
            totalPrice={props.totalPrice}
            purchasable={isPurchasable(props.ingredients)}
            orderClicked={purchaseHandler}
            isUserAuthenticated={props.isUserAuthenticated}
          />
        </>
      ) : props.error ? (
        <p>Ingredients can't be loaded</p>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    totalPrice: state.burgerBuilder.totalPrice,
    ingredients: state.burgerBuilder.ingredients,
    error: state.burgerBuilder.error,
    isUserAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
