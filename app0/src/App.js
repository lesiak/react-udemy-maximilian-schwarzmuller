import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'person0', name: 'Max', age: 28 },
      { id: 'person1', name: 'Manu I react to click', age: 29 },
      { id: 'person2', name: 'Stephanie', age: 26 },
    ],
    otherState:
      'setState merges current state with the update, this is not removed',
    showPersons: false,
  };

  deletePersonHandler = (index) => {
    // const personsCopy = this.state.persons.slice();
    const personsCopy = [...this.state.persons];
    personsCopy.splice(index, 1);
    this.setState({
      persons: personsCopy,
    });
  };

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 },
      ],
    });
  };

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons,
    });
  };

  render() {
    const buttonStyle = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    return (
      <div className="App">
        <h1>I'm a react app</h1>
        <p>This is really working</p>
        <button style={buttonStyle} onClick={this.togglePersonsHandler}>
          Show / Hide
        </button>
        {this.renderPersons()}
        <p>{this.state.otherState}</p>
      </div>
    );
  }

  renderPersons() {
    return this.state.showPersons ? (
      <div>
        {this.state.persons.map((person, index) => {
          return (
            <Person
              name={person.name}
              age={person.age}
              click={() => this.deletePersonHandler(index)}
              key={person.id}
            />
          );
        })}
      </div>
    ) : null;
  }
}

export default App;
