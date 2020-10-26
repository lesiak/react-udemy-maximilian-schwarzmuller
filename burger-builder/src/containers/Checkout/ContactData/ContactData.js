import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

import cssClasses from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../components/Hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';
import { checkValidity } from '../../../shared/utility';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      value: 'James Bond',
      validation: {
        required: true,
        minLength: 5,
      },
      valid: true,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '217 Strand',
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Postal Code',
      },
      value: 'GV7Q+82 London',
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country',
      },
      value: 'UK',
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Email',
      },
      value: 'james@secretservice.com',
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      value: 'fastest',
      valid: true,
    },
  });

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    console.log(formData);
    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  const formIsValid = () => {
    const formValid = Object.entries(orderForm).every(([_id, config]) => config.valid);
    return formValid;
  };

  const inputChangedHandler = (inputIdenfifier, event) => {
    const updatedForm = {
      ...orderForm,
    };
    const updatedFormElement = { ...updatedForm[inputIdenfifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[inputIdenfifier] = updatedFormElement;
    console.log(updatedFormElement.valid);
    setOrderForm(updatedForm);
  };

  const form = props.loading ? (
    <Spinner />
  ) : (
    <form onSubmit={orderHandler}>
      {Object.entries(orderForm).map(([id, config]) => (
        <Input
          key={id}
          elementType={config.elementType}
          elementConfig={config.elementConfig}
          value={config.value}
          invalid={!config.valid}
          touched={config.touched}
          onChange={(event) => inputChangedHandler(id, event)}
        />
      ))}
      <Button btnType="success" disabled={!formIsValid()}>
        ORDER
      </Button>
    </form>
  );
  return (
    <div className={cssClasses.contactdata}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
