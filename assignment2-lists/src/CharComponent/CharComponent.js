import React from 'react';

const charComponent = (props) => {
  const { text } = props;
  const style = {
    display: 'inline-block',
    padding: '16px',
    textAlign: 'center',
    margin: '16px',
    border: '1px solid black',
  };
  return <span style={style}>{text}</span>;
};

export default charComponent;
