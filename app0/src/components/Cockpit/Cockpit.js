import React, { useEffect, useRef } from 'react';

import cssClasses from './Cockpit.module.css';
import AuxFragment from '../../hoc/AuxFragment';

const Cockpit = (props) => {
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect that runs only once');
    toggleBtnRef.current.click();
    return () => console.log('[Cockpit.js] Cleanup work in useEffect');
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect2 every render');
    return () => console.log('[Cockpit.js] useEffect2 cleanup');
  });

  const getToggleButtonClassName = () =>
    props.showPersons ? `${cssClasses.toggleButton} ${cssClasses.on}` : `${cssClasses.toggleButton}`;

  const statusClasses = [];
  if (props.personsLength <= 2) {
    statusClasses.push(cssClasses.red);
  }
  if (props.personsLength <= 1) {
    statusClasses.push(cssClasses.bold);
  }

  return (
    <AuxFragment>
      <h1>{props.title}</h1>
      <p className={statusClasses.join(' ')}>This is really working</p>
      <button className={getToggleButtonClassName()} onClick={props.onToggleShowPersons} ref={toggleBtnRef}>
        {props.showPersons ? 'Hide' : 'Show'}
      </button>
    </AuxFragment>
  );
};

export default React.memo(Cockpit);
