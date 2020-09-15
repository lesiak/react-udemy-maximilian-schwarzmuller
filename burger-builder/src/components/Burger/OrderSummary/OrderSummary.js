import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientsSummary = Object.entries(props.ingredients).map(([ingr, amount]) => (
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
      <p>Continue to Checkout?</p>
      <Button btnType="danger" onClick={props.onPurchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="success" onClick={props.onPurchaseContinue}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
