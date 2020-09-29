import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

import cssClasses from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
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
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    console.log(formData);
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => this.setState({ loading: false }));
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules?.required) {
      isValid = isValid && value.trim() !== '';
    }
    if (rules?.minLength) {
      isValid = isValid && value.length >= rules.minLength;
    }
    return isValid;
  };

  inputChangedHandler = (inputIdenfifier, event) => {
    // console.log(event.target.value);
    const updatedForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = { ...updatedForm[inputIdenfifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedForm[inputIdenfifier] = updatedFormElement;
    console.log(updatedFormElement.valid);
    this.setState({ orderForm: updatedForm });
  };

  render() {
    const form = this.state.loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.orderHandler}>
        {Object.entries(this.state.orderForm).map(([id, config]) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            onChange={(event) => this.inputChangedHandler(id, event)}
          />
        ))}
        <Button btnType="success">ORDER</Button>
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

export default ContactData;
