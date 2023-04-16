import React from 'react';

import './cart-dropdown.styles.scss';
import Button from '../button/Button';

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <Button buttonType={'inverted'}>Checkout</Button>
    </div>
  );
};

export default CartDropdown;
