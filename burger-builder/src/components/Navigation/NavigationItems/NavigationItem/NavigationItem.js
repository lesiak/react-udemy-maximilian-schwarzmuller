import React from 'react';
import { NavLink } from 'react-router-dom';

import cssClasses from './NavigationItem.module.css';

const NavigationItem = (props) => (
  <li className={cssClasses.navigationitem}>
    <NavLink to={props.to} exact={props.exact} activeClassName={cssClasses.active}>
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;
