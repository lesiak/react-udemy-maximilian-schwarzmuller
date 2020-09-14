import React from 'react';

import cssClasses from './Modal.module.css';

const Modal = (props) => <div className={cssClasses.modal}>{props.children}</div>;

export default Modal;
