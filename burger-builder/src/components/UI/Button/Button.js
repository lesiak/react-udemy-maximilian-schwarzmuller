import React from 'react';

import cssClasses from './Button.module.css';

const Button = (props) => (
  <button
    className={[cssClasses.button, cssClasses[props.btnType]].join(' ')}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default Button;
