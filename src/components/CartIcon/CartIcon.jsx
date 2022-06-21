import React, { useContext } from 'react';

// Styles
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './CartIcon.styles.scss';

// Context
import { CartContext } from '../../context/CartContext';

const CartIcon = () => {
  const { setIsCartOpen } = useContext(CartContext);

  const toggleCart = () => setIsCartOpen((cart) => !cart);

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;
