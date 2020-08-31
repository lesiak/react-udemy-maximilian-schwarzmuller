import React from 'react';

const validationComponent = (props) => {
  const { text } = props;
  const textLengthValid = text.length >= 5;
  const textTooShortMessage = 'Text too short';
  const textLongEnoughMessage = 'Text long enough';
  const style = textLengthValid ? {} : { color: 'red' };
  return (
    <p style={style}>
      {textLengthValid ? textLongEnoughMessage : textTooShortMessage}
    </p>
  );
};

export default validationComponent;
