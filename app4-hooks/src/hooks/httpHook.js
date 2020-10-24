import { useReducer, useCallback } from 'react';

const initialState = {
  loading: false,
  error: null,
  data: null,
  reqData: null,
  reqIdentifier: null,
};

const httpReducer = (prevHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null, data: null, reqData: null, reqIdentifier: action.reqIdentifier };
    case 'RESPONSE':
      return { ...prevHttpState, loading: false, error: null, data: action.responseData, reqData: action.reqData };
    case 'ERROR':
      return { ...prevHttpState, loading: false, error: action.errorMessage, data: null };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not reach this line');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

  const sendRequest = useCallback(async (url, method, body, reqData, reqIdentifier) => {
    dispatchHttp({ type: 'SEND', reqIdentifier });
    try {
      const response = await fetch(url, {
        method: method,
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      dispatchHttp({ type: 'RESPONSE', responseData, reqData });
    } catch (error) {
      dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong: ' + error.message });
    }
  }, []);

  return {
    loading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    reqData: httpState.reqData,
    reqIdentifier: httpState.reqIdentifier,
    clear,
  };
};

export default useHttp;
