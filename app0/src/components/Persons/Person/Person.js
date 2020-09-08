import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withClass from '../../../hoc/WithClass';

import personClasses from './Person.module.css';

class Person extends Component {
  componentDidMount() {
    this.inputElement.focus();
  }

  render = () => {
    console.log('[Person.js] render');
    return (
      <>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          ref={(inputEl) => {
            this.inputElement = inputEl;
          }}
          onChange={this.props.changed}
          value={this.props.name}
        />
      </>
    );
  };
}

Person.propTypes = {
  click: PropTypes.func,
  changed: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
};

export default withClass(Person, personClasses.Person);
