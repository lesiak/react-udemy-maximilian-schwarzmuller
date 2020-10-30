import { useState, useEffect } from 'react';

let globalState = {};
let listeneres = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionId) => {
    const newState = actions[actionId](globalState);
    globalState = { ...globalState, ...newState };

    for (const listener of listeneres) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeneres.push(setState);

    return () => {
      listeneres = listeneres.filter((li) => li !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
