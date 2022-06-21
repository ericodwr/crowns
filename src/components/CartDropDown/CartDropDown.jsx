import React from 'react';

import './CartDropDown.styles.scss';

// Components
import Button from '../Button/Button';

const CartDropDown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropDown;
