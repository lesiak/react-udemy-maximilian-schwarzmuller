import React, { Component } from 'react';

import Persons from './containers/Persons';

import cssClasses from './App.module.css';

class App extends Component {
  render() {
    return (
      <>
        <header className={cssClasses.appHeader}>
          <ol>
            <li>Turn this app into one which does NOT use local state (in components) but instead uses Redux</li>
          </ol>
        </header>
        <main className={cssClasses.appMain}>
          <Persons />
        </main>
      </>
    );
  }
}

export default App;
