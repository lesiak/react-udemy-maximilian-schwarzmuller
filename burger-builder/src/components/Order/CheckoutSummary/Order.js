import React from 'react';

import cssClasses from './Order.module.css';

const Order = (props) => {
  return (
    <div className={cssClasses.order}>
      <p>Ingredients: Salad (1)</p>
      <p>
        Price: <strong>USD 5.45</strong>
      </p>
    </div>
  );
};

export default Order;
