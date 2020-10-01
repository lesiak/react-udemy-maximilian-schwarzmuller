import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from '../store/actions';

class Persons extends Component {
  personAddedHandler = () => {
    const newPerson = {
      id: Math.random(), // not really unique but good enough here!
      name: 'Max',
      age: Math.floor(Math.random() * 40),
    };
    this.props.onAddPerson(newPerson);
  };

  render() {
    return (
      <div>
        <AddPerson personAdded={this.personAddedHandler} />
        {this.props.persons.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            age={person.age}
            clicked={() => this.props.onRemovePerson(person.id)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    persons: state.persons,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPerson: (person) => dispatch({ type: actionTypes.ADD_PERSON, person: person }),
    onRemovePerson: (personId) => dispatch({ type: actionTypes.REMOVE_PERSON, personId: personId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
