import React from 'react';

import cssClasses from './Toolbar.module.css';

const Toolbar = (props) => (
  <header className={cssClasses.toolbar}>
    <div>MENU</div>
    <div>LOGO</div>
    <nav>...</nav>
  </header>
);

export default Toolbar;
