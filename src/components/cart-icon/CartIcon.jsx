import React, { useContext } from 'react';

// context
import { CartContext } from '../../context/CartContext';

// styles
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = () => {
  // context
  const { setIsCartOpen, totalCart } = useContext(CartContext);

  // cart toggle func helper
  const cartToggle = () => setIsCartOpen((state) => !state);

  return (
    <div onClick={cartToggle} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{totalCart}</span>
    </div>
  );
};

export default CartIcon;
