import React from 'react';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

import cssClasses from './SideDrawer.module.css';

const SideDrawer = (props) => {
  const attachedClasses = [cssClasses.sidedrawer, props.open ? cssClasses.open : cssClasses.closed];
  return (
    <>
      <Backdrop show={props.open} onClick={props.onClose} />
      <div className={attachedClasses.join(' ')}>
        <div className={cssClasses.logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isUserAuthenticated={props.isUserAuthenticated} />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
