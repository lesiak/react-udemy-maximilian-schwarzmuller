import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import cssClasses from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  return (
    <div className={cssClasses.checkoutsummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="danger" onClick={() => {}}>
        CANCEL
      </Button>
      <Button btnType="success" onClick={() => {}}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
