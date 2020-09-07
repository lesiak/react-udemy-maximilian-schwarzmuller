import React, { useEffect } from 'react';

import cssClasses from './Cockpit.module.css';

const Cockpit = (props) => {
  useEffect(() => {
    console.log('[Cockpit.js] useEffect that depends on props.persons');
  }, [props.persons]);

  const getToggleButtonClassName = () =>
    props.showPersons ? `${cssClasses.toggleButton} ${cssClasses.on}` : `${cssClasses.toggleButton}`;

  const statusClasses = [];
  if (props.persons.length <= 2) {
    statusClasses.push(cssClasses.red);
  }
  if (props.persons.length <= 1) {
    statusClasses.push(cssClasses.bold);
  }

  return (
    <>
      <h1>{props.title}</h1>
      <p className={statusClasses.join(' ')}>This is really working</p>
      <button className={getToggleButtonClassName()} onClick={props.onToggleShowPersons}>
        {props.showPersons ? 'Hide' : 'Show'}
      </button>
    </>
  );
};

export default Cockpit;
