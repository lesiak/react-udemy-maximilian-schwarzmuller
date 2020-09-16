import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import cssClasses from './SideDrawer.module.css';

const SideDrawer = (props) => {
  return (
    <div className={cssClasses.sidedrawer}>
      <div className={cssClasses.logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default SideDrawer;
