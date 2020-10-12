import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

import cssClasses from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../components/Hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';
import { checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
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
    },
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    console.log(formData);
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  formIsValid = () => {
    const formValid = Object.entries(this.state.orderForm).every(([_id, config]) => config.valid);
    return formValid;
  };

  inputChangedHandler = (inputIdenfifier, event) => {
    const updatedForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = { ...updatedForm[inputIdenfifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[inputIdenfifier] = updatedFormElement;
    console.log(updatedFormElement.valid);
    this.setState({ orderForm: updatedForm });
  };

  render() {
    const form = this.props.loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.orderHandler}>
        {Object.entries(this.state.orderForm).map(([id, config]) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            invalid={!config.valid}
            touched={config.touched}
            onChange={(event) => this.inputChangedHandler(id, event)}
          />
        ))}
        <Button btnType="success" disabled={!this.formIsValid()}>
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
  }
}

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
