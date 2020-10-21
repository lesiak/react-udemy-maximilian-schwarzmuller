import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from 'axios';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
  const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
  const url = action.isSignIn ? signInUrl : signUpUrl;
  try {
    const response = yield axios.post(url, {
      email: action.email,
      password: action.password,
      returnSecureToken: true,
    });
    console.log(response);
    const newTimestamp = new Date().getTime() + response.data.expiresIn * 1000;
    const expirationDate = new Date(newTimestamp);
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    console.log(err.response.data.error);
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = localStorage.getItem('token');
  const expirationDateString = localStorage.getItem('expirationDate');
  const userId = localStorage.getItem('userId');
  if (!token || !expirationDateString || !userId) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(expirationDateString);
    if (expirationDate > new Date()) {
      const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000;
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout(expirationTime));
    } else {
      yield put(actions.logout());
    }
  }
}
