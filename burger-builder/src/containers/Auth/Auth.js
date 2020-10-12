import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions';
import cssClasses from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

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
    isSignInMode: true,
  };

  componentDidMount = () => {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/');
    }
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
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[inputIdenfifier] = updatedFormElement;
    this.setState({ controls: updatedForm });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    this.props.onAuth(email, password, this.state.isSignInMode);
  };

  swithAuthModeHandler = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({ isSignInMode: !prevState.isSignInMode }));
  };

  render() {
    if (this.props.isUserAuthenicated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={cssClasses.Auth}>
        {this.props.error ? <p>{this.props.error.message}</p> : null}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.submitHandler}>
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
              {this.state.isSignInMode ? 'Sign In' : 'Sign Up'}
            </Button>
            <Button btnType="danger" onClick={this.swithAuthModeHandler}>
              Swith to {this.state.isSignInMode ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isUserAuthenicated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
