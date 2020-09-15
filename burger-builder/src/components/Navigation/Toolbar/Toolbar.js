import React from 'react';
import Logo from '../../Logo/Logo';

import cssClasses from './Toolbar.module.css';

const Toolbar = (props) => (
  <header className={cssClasses.toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>...</nav>
  </header>
);

export default Toolbar;
