import React from 'react';

import Spinner from '../spinner/Spinner';

// styles
import './button.styles.scss';

// types
const BUTTON_TYPES_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, buttonType, isLoading, ...props }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <button
      className={`${BUTTON_TYPES_CLASSES[buttonType]} button-container`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
