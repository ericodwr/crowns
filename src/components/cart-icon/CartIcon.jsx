import React from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount } from '../../store/cart/cart.selector';

// styles
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = () => {
  const dispatch = useDispatch();

  const totalCart = useSelector(selectCartCount);

  // cart toggle func helper
  const cartToggle = () => dispatch(setIsCartOpen());

  return (
    <div onClick={cartToggle} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{totalCart}</span>
    </div>
  );
};

export default CartIcon;
