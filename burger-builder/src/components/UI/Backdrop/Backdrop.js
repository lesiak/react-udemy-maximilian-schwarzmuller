import React from 'react';

import cssClasses from './Backdrop.module.css';

const Backdrop = (props) => (props.show ? <div className={cssClasses.backdrop} onClick={props.onClick}></div> : null);

export default Backdrop;
