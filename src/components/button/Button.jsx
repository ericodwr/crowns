import React from 'react';

import './button.styles.scss';

const BUTTON_TYPES_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, buttonType, ...props }) => {
  return (
    <button
      className={`${BUTTON_TYPES_CLASSES[buttonType]} button-container`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
