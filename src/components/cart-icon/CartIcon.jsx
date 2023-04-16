import React, { useContext } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';
import { CartContext } from '../../context/CartContext';

const CartIcon = () => {
  const { setIsCartOpen } = useContext(CartContext);

  // cart toggle func helper
  const cartToggle = () => setIsCartOpen((state) => !state);

  return (
    <div onClick={cartToggle} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
