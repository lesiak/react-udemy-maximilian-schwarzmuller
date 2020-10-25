import React, { useState } from 'react';
import { connect } from 'react-redux';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import cssClasses from './Layout.module.css';

const Layout = (props) => {
  // state = {
  //   showSideDrawer: false,
  // };
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerVisible(false);
  };

  const sideDrawerToggledHandler = () => {
    setSideDrawerVisible(!sideDrawerVisible);
  };

  return (
    <>
      <div>
        <Toolbar isUserAuthenticated={props.isUserAuthenticated} onDrawerToggleClicked={sideDrawerToggledHandler} />
        <SideDrawer
          isUserAuthenticated={props.isUserAuthenticated}
          open={sideDrawerVisible}
          onClose={sideDrawerClosedHandler}
        />
      </div>
      <main className={cssClasses.content}>{props.children}</main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
