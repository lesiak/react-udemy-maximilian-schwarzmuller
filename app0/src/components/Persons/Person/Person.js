import React, { Component } from 'react';
import withClass from '../../../hoc/WithClass';

import personClasses from './Person.module.css';

class Person extends Component {
  render = () => {
    console.log('[Person.js] render');
    return (
      <>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
      </>
    );
  };
}

export default withClass(Person, personClasses.Person);
