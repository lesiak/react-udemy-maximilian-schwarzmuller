import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import cssClasses from './Toolbar.module.css';

const Toolbar = (props) => (
  <header className={cssClasses.toolbar}>
    <div>MENU</div>
    <div className={cssClasses.logo}>
      <Logo />
    </div>
    <nav className={cssClasses.desktoponly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
