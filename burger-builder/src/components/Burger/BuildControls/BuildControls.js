import React from 'react';

import cssClasses from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
  return (
    <div className={cssClasses.buildcontrols}>
      <p>
        Current price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabledInfo[ctrl.type]}
        />
      ))}
      <button className={cssClasses.orderbutton} disabled={!props.purchasable}>
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
