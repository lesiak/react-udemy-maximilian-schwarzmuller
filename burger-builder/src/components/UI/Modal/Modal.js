import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

import cssClasses from './Modal.module.css';

const Modal = (props) => {
  return (
    <>
      <Backdrop show={props.show} onClick={props.modalClosed} />
      <div
        className={cssClasses.modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default React.memo(Modal, (prevProps, nextProps) => {
  return nextProps.show === prevProps.show && nextProps.children === prevProps.children;
});
