import React, { Component } from 'react';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import cssClasses from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  render() {
    return (
      <>
        <div>
          <Toolbar />
          <SideDrawer open={this.state.showSideDrawer} onClose={this.sideDrawerClosedHandler} />
        </div>
        <main className={cssClasses.content}>{this.props.children}</main>
      </>
    );
  }
}
export default Layout;
