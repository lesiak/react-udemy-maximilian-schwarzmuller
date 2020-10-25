import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import '../src/components/Layout/Layout';
import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

const App = (props) => {
  useEffect(() => {
    props.onAuthCheckState();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        {props.isUserAuthenicated ? (
          <>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </>
        ) : null}
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Layout>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserAuthenicated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
