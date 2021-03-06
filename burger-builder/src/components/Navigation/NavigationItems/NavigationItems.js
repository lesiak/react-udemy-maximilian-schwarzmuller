import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import cssClasses from './NavigationItems.module.css';

const NavigationItems = (props) => (
  <ul className={cssClasses.navigationitems}>
    <NavigationItem to="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isUserAuthenticated ? <NavigationItem to="/orders">Orders</NavigationItem> : null}
    {!props.isUserAuthenticated ? (
      <NavigationItem to="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem to="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
