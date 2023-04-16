import React, { useContext } from 'react';

// router dom
import { useNavigate } from 'react-router-dom';

// contexts
import { CartContext } from '../../context/CartContext';

// styles and components
import './cart-dropdown.styles.scss';
import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';

const CartDropdown = () => {
  // contexts
  const { cartItems, setIsCartOpen } = useContext(CartContext);

  // use navigate
  const navigate = useNavigate();

  // navigate to checkout page
  const goToCheckoutPage = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button buttonType={'inverted'} onClick={goToCheckoutPage}>
        Checkout
      </Button>
    </div>
  );
};

export default CartDropdown;
