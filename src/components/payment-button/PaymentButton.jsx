import React from 'react';
import Button from '../button/Button';

import './payment-button.styles.css';

const PaymentButton = ({ children, isLoading, ...otherProps }) => {
  return (
    <div className="payment-button-container">
      <Button isLoading={isLoading} buttonType={'inverted'} {...otherProps}>
        {children}
      </Button>
    </div>
  );
};

export default PaymentButton;
