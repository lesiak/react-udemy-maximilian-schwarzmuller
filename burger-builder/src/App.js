import React, { Component } from 'react';

import '../src/components/Layout/Layout';
import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
          <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;
