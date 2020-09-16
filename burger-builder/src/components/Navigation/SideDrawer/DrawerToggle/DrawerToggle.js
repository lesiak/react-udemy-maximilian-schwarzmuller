import React from 'react';

import cssClasses from './DrawerToggle.module.css';

const DrawerToggle = (props) => (
  <div className={cssClasses.drawertoggle} onClick={props.onClick}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default DrawerToggle;
