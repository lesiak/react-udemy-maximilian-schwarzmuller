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

class BurgerBuilder extends Component {
  state = {
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
    queryParams.push('totalPrice=' + this.props.totalPrice);
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
    totalPrice: state.totalPrice,
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
