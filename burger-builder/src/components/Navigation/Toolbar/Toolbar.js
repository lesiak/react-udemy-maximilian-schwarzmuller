import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import cssClasses from './Toolbar.module.css';

const Toolbar = (props) => (
  <header className={cssClasses.toolbar}>
    <DrawerToggle onClick={props.onDrawerToggleClicked} />
    <div className={cssClasses.logo}>
      <Logo />
    </div>
    <nav className={cssClasses.desktoponly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
