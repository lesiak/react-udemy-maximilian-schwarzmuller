import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinueHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  const needsRedirect = !props.ingredients || props.purchased;
  return needsRedirect ? (
    <Redirect to="/" />
  ) : (
    <div>
      <CheckoutSummary
        ingredients={props.ingredients}
        onCheckoutCancel={checkoutCancelledHandler}
        onCheckoutContinue={checkoutContinueHandler}
      />
      <Route path={props.match.path + '/contact-data'} component={ContactData} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
