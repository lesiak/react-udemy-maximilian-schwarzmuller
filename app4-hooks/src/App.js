import React, { useContext } from 'react';
import Auth from './components/Auth';
import { AuthContext } from './context/AuthContext';

import Ingredients from './components/Ingredients/Ingredients';

const App = (props) => {
  const authContext = useContext(AuthContext);
  if (authContext.isAuth) {
  }
  return authContext.isAuth ? <Ingredients /> : <Auth />;
};

export default App;
