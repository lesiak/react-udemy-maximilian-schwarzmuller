import React from 'react';

import cssClasses from './Input.module.css';

const Input = (props) => {
  let inputElement = null;
  const inputClassesArr = [cssClasses.InputElement];
  if (props.invalid && props.touched) {
    inputClassesArr.push(cssClasses.Invalid);
  }
  const inputClasses = inputClassesArr.join(' ');
  switch (props.elementType) {
    case 'textarea':
      inputElement = (
        <textarea className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.onChange} />
      );
      break;
    case 'select':
      inputElement = (
        <select className={inputClasses} value={props.value} onChange={props.onChange}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case 'input':
    default:
      inputElement = (
        <input className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.onChange} />
      );
  }

  return (
    <div className={cssClasses.Input}>
      <label className={cssClasses.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
