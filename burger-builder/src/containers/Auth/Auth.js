import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import cssClasses from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules?.required) {
      isValid = isValid && value.trim() !== '';
    }
    if (rules?.minLength) {
      isValid = isValid && value.length >= rules.minLength;
    }
    if (rules?.maxLength) {
      isValid = isValid && value.length <= rules.maxLength;
    }
    if (rules?.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = isValid && pattern.test(value);
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = isValid && pattern.test(value);
    }
    return isValid;
  };

  formIsValid = () => {
    const formValid = Object.entries(this.state.controls).every(([_id, config]) => config.valid);
    return formValid;
  };

  inputChangedHandler = (inputIdenfifier, event) => {
    const updatedForm = {
      ...this.state.controls,
    };
    const updatedFormElement = { ...updatedForm[inputIdenfifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[inputIdenfifier] = updatedFormElement;
    this.setState({ controls: updatedForm });
  };

  render() {
    return (
      <div className={cssClasses.Auth}>
        <form>
          {Object.entries(this.state.controls).map(([id, config]) => (
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
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default Auth;
