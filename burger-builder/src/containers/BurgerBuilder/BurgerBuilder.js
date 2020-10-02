import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/Hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    ingredientsError: false,
  };

  componentDidMount() {
    // axios
    //   .get('/ingredients.json')
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       ingredientsError: true,
    //     });
    //   });
  }

  updatePurchaseState(updatedIngredients) {
    const sumAmount = Object.entries(updatedIngredients)
      .map(([_ingr, amount]) => amount)
      .reduce((sum, el) => sum + el, 0);
    this.setState({
      purchasable: sumAmount > 0,
    });
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let ing in this.state.ingredients) {
      queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.state.ingredients[ing]));
    }
    queryParams.push('totalPrice=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };

  render() {
    const disabledInfo = () =>
      Object.fromEntries(Object.entries(this.props.ingredients).map(([ingr, amount]) => [ingr, amount <= 0]));
    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {this.state.loading || !this.props.ingredients ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={this.props.ingredients}
              onPurchaseCancelled={this.purchaseCancelHandler}
              onPurchaseContinue={this.purchaseContinueHandler}
              totalPrice={this.state.totalPrice}
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
              totalPrice={this.state.totalPrice}
              purchasable={this.state.purchasable}
              orderClicked={this.purchaseHandler}
            />
          </>
        ) : this.state.ingredientsError ? (
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
    ingredients: state.ingredients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGEREDIENT, ingredientName }),
    onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGEREDIENT, ingredientName }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
