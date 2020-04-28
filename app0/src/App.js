import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>I'm a react app</h1>
        <p>This is really working</p>
        <Person />
        <Person />
        <Person />
      </div>
    );
  }
}

export default App;
