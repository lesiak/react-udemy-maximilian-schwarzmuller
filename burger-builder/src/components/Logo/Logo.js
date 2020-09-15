import React from 'react';

import cssClasses from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = (props) => (
  <div className={cssClasses.logo}>
    <img alt="burger logo" src={burgerLogo} />
  </div>
);

export default Logo;
