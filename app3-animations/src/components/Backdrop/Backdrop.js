import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
  const backdropCssClasses = ['Backdrop', props.show ? 'BackdropOpen' : 'BackdropClosed'];
  return <div className={backdropCssClasses.join(' ')}></div>;
};

export default backdrop;
