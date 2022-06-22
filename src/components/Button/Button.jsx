import React from 'react';

import './Button.styles.scss';

const BUTTON_TYPES_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, isLoading, buttonType, ...otherProps }) => {
  return (
    <button
      disabled={isLoading}
      className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {isLoading ? 'Processing' : children}
    </button>
  );
};

export default Button;
