import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import cssClasses from './NavigationItems.module.css';

const NavigationItems = () => (
  <ul className={cssClasses.navigationitems}>
    <NavigationItem to="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem to="/orders">Orders</NavigationItem>
    <NavigationItem to="/auth">Authenticate</NavigationItem>
  </ul>
);

export default NavigationItems;
