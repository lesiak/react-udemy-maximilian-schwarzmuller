import React, { Component } from 'react';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    // state initialization this.state = {some props}
    // setting state in class body is equivalent and available in modern JS
    // do not use this.setState - there is no state to merge with
  }

  state = {
    persons: [
      { id: 'person0', name: 'Max', age: 28 },
      { id: 'person1', name: 'Manu I react to click', age: 29 },
      { id: 'person2', name: 'Stephanie', age: 26 },
    ],
    showPersons: false,
    showCockpit: true,
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

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
    console.log('[App.js] render');
    return (
      <div className="App">
        <button onClick={() => this.setState({ showCockpit: false })}>Remove cockpit</button>
        {this.state.showCockpit ? (
          <Cockpit
            persons={this.state.persons}
            showPersons={this.state.showPersons}
            onToggleShowPersons={this.togglePersonsHandler}
            title={this.props.appTitle}
          />
        ) : null}
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
