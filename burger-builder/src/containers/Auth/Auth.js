import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions';
import cssClasses from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

const Auth = (props) => {
  const [controls, setControls] = useState({
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
  });
  const [isSignInMode, setIsSignInMode] = useState(true);
  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath('/');
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const formIsValid = () => {
    const formValid = Object.entries(controls).every(([_id, config]) => config.valid);
    return formValid;
  };

  const inputChangedHandler = (inputIdenfifier, event) => {
    const updatedForm = {
      ...controls,
    };
    const updatedFormElement = { ...updatedForm[inputIdenfifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[inputIdenfifier] = updatedFormElement;
    setControls(updatedForm);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const email = controls.email.value;
    const password = controls.password.value;
    props.onAuth(email, password, isSignInMode);
  };

  const swithAuthModeHandler = (event) => {
    event.preventDefault();
    setIsSignInMode(!isSignInMode);
  };

  if (props.isUserAuthenicated) {
    return <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={cssClasses.Auth}>
      {props.error ? <p>{props.error.message}</p> : null}
      {props.loading ? (
        <Spinner />
      ) : (
        <form onSubmit={submitHandler}>
          {Object.entries(controls).map(([id, config]) => (
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
            {isSignInMode ? 'Sign In' : 'Sign Up'}
          </Button>
          <Button btnType="danger" onClick={swithAuthModeHandler}>
            Swith to {isSignInMode ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
      )}
    </div>
  );
};

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
