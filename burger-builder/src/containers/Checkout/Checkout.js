import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const needsRedirect = !this.props.ingredients || this.props.purchased;
    return needsRedirect ? (
      <Redirect to="/" />
    ) : (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          onCheckoutCancel={this.checkoutCancelledHandler}
          onCheckoutContinue={this.checkoutContinueHandler}
        />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
