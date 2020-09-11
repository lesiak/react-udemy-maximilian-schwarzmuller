import React from 'react';

import cssClasses from './BuildControl.module.css';

const BuildControl = (props) => {
  return (
    <div className={cssClasses.buildcontrol}>
      <div className={cssClasses.label}>{props.label}</div>
      <button className={cssClasses.less}>Less</button>
      <button className={cssClasses.more} onClick={props.added}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
