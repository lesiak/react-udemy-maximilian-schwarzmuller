import React, { Component } from 'react';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import './App.css';

class App extends Component {
  state = {
    persons: [
      { id: 'person0', name: 'Max', age: 28 },
      { id: 'person1', name: 'Manu I react to click', age: 29 },
      { id: 'person2', name: 'Stephanie', age: 26 },
    ],
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
    return (
      <div className="App">
        <Cockpit
          persons={this.state.persons}
          showPersons={this.state.showPersons}
          onToggleShowPersons={this.togglePersonsHandler}
        />
        {this.renderPersons()}
      </div>
    );
  }

  renderPersons() {
    return this.state.showPersons ? (
      <div>
        <Persons persons={this.state.persons} clicked={this.deletePersonHandler} changed={this.nameChangedHandler} />
      </div>
    ) : null;
  }
}

export default App;
