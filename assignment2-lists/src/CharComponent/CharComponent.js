import React from 'react';

const charComponent = (props) => {
  const { text, onClick } = props;
  const style = {
    display: 'inline-block',
    padding: '16px',
    textAlign: 'center',
    margin: '16px',
    border: '1px solid black',
  };
  return (
    <span style={style} onClick={onClick}>
      {text}
    </span>
  );
};

export default charComponent;
