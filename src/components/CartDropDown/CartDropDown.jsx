import React, { useContext } from 'react';

import './CartDropDown.styles.scss';

// Context
import { CartContext } from '../../context/CartContext';

// Components
import Button from '../Button/Button';
import CartItem from '../CartItem/CartItem';

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems?.map((cartItem, i) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropDown;
