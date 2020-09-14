import React from 'react';

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
    </>
  );
};

export default OrderSummary;
