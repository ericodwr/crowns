import React, { useContext } from 'react';

import './CartDropDown.styles.scss';

// React router dom
import { useNavigate } from 'react-router-dom';

// Context
import { CartContext } from '../../context/CartContext';

// Components
import Button from '../Button/Button';
import CartItem from '../CartItem/CartItem';

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => navigate('/checkout');

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems?.map((cartItem, i) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropDown;
