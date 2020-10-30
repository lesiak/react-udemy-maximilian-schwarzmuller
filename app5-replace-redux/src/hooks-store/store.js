import { useState, useEffect } from 'react';

let globalState = {};
let listeneres = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionId, payload) => {
    const newState = actions[actionId](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeneres) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeneres.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeneres = listeneres.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
