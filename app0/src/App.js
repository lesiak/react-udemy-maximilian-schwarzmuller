import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';
import './App.css';

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

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => p.id === id);
    // const person = Object.assign({}, this.state.persons[personIndex]);
    const person = {
      ...this.state.persons[personIndex],
    };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons,
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
      ':hover': {
        backgroundColor: 'lightGreen',
        color: 'black',
      },
    };

    if (this.state.showPersons) {
      buttonStyle.backgroundColor = 'salmon';
      buttonStyle[':hover'] = {
        backgroundColor: 'red',
      };
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>I'm a react app</h1>
          <p className={classes.join(' ')}>This is really working</p>
          <button style={buttonStyle} onClick={this.togglePersonsHandler}>
            {this.state.showPersons ? 'Hide' : 'Show'}
          </button>
          {this.renderPersons()}
          <p>{this.state.otherState}</p>
        </div>
      </StyleRoot>
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
              changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          );
        })}
      </div>
    ) : null;
  }
}

export default Radium(App);
