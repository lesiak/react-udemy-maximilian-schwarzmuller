import React from 'react';

import cssClasses from './NavigationItem.module.css';

const NavigationItem = (props) => (
  <li className={cssClasses.navigationitem}>
    <a href={props.href} className={props.active ? cssClasses.active : null}>
      {props.children}
    </a>
  </li>
);

export default NavigationItem;
