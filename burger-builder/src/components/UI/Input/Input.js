import React from 'react';

import cssClasses from './Input.module.css';

const Input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case 'input':
      inputElement = <input className={cssClasses.InputElement} {...props.elementConfig} value={props.value} />;
      break;
    case 'textarea':
      inputElement = <textarea className={cssClasses.InputElement} {...props.elementConfig} value={props.value} />;
      break;
    default:
      inputElement = <input className={cssClasses.InputElement} {...props.elementConfig} value={props.value} />;
  }

  return (
    <div className={cssClasses.Input}>
      <label className={cssClasses.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
