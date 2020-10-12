import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/Hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  isPurchasable(ingredients) {
    const sumAmount = Object.entries(ingredients)
      .map(([_ingr, amount]) => amount)
      .reduce((sum, el) => sum + el, 0);
    return sumAmount > 0;
  }

  purchaseHandler = () => {
    if (this.props.isUserAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = () =>
      Object.fromEntries(Object.entries(this.props.ingredients).map(([ingr, amount]) => [ingr, amount <= 0]));
    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {!this.props.ingredients ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={this.props.ingredients}
              onPurchaseCancelled={this.purchaseCancelHandler}
              onPurchaseContinue={this.purchaseContinueHandler}
              totalPrice={this.props.totalPrice}
            />
          )}
        </Modal>
        {this.props.ingredients ? (
          <>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabledInfo={disabledInfo()}
              totalPrice={this.props.totalPrice}
              purchasable={this.isPurchasable(this.props.ingredients)}
              orderClicked={this.purchaseHandler}
              isUserAuthenticated={this.props.isUserAuthenticated}
            />
          </>
        ) : this.props.error ? (
          <p>Ingredients can't be loaded</p>
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
