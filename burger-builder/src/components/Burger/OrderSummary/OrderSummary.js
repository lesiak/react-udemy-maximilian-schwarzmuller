import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('[OrderSummary] componentWillUpdate');
  }

  render() {
    const ingredientsSummary = Object.entries(this.props.ingredients).map(([ingr, amount]) => (
      <li key={ingr}>
        <span style={{ textTransform: 'capitalize' }}>{ingr}: </span>
        {amount}
      </li>
    ));
    return (
      <>
        <h3>Your Order</h3>
        <p>Burger with following ingredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="danger" onClick={this.props.onPurchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="success" onClick={this.props.onPurchaseContinue}>
          CONTINUE
        </Button>
      </>
    );
  }
}

export default OrderSummary;
