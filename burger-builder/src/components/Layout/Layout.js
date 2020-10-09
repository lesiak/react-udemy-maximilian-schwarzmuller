import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import cssClasses from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  sideDrawerToggledHandler = () => {
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));
  };

  render() {
    return (
      <>
        <div>
          <Toolbar
            isUserAuthenticated={this.props.isUserAuthenticated}
            onDrawerToggleClicked={this.sideDrawerToggledHandler}
          />
          <SideDrawer
            isUserAuthenticated={this.props.isUserAuthenticated}
            open={this.state.showSideDrawer}
            onClose={this.sideDrawerClosedHandler}
          />
        </div>
        <main className={cssClasses.content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
