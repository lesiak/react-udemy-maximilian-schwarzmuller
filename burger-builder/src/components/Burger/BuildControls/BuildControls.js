import React from 'react';

import cssClasses from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => {
  return (
    <div className={cssClasses.buildcontrols}>
      <BuildControl label="meat" />
      <BuildControl label="cheese" />
    </div>
  );
};

export default BuildControls;
