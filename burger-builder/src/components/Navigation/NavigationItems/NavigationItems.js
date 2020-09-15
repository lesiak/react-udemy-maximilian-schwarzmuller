import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import cssClasses from './NavigationItems.module.css';

const NavigationItems = () => (
  <ul className={cssClasses.navigationitems}>
    <NavigationItem href="/" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem href="/">Checkout</NavigationItem>
  </ul>
);

export default NavigationItems;
