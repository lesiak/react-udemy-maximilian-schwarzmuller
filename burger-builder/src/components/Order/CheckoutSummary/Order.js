import React from 'react';

import cssClasses from './Order.module.css';

const Order = (props) => {
  const ingredientComponents = Object.entries(props.ingredients).map(([ingName, amount]) => (
    <span key={ingName} className={cssClasses.ingredient}>
      {ingName} ({amount})
    </span>
  ));

  return (
    <div className={cssClasses.order}>
      <p>Ingredients: {ingredientComponents}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
