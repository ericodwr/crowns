import { FC, ButtonHTMLAttributes } from 'react';
import Button from '../button/Button';

import './payment-button.styles.css';

type ButtonPorps = {
  isLoading: boolean;
  buttonType?: any;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const PaymentButton: FC<ButtonPorps> = ({
  children,
  isLoading,
  ...otherProps
}) => {
  return (
    <div className="payment-button-container">
      <Button isLoading={isLoading} buttonType={'inverted'} {...otherProps}>
        {children}
      </Button>
    </div>
  );
};

export default PaymentButton;
