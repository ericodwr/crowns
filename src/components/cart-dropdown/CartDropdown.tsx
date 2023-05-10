import { useCallback } from 'react';

// router dom
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { closeCart } from '../../store/cart/cart.action';

// styles and components
import './cart-dropdown.styles.scss';
import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';
import { selectCurrentUser } from '../../store/user/user.selector';

const CartDropdown = () => {
  // redux
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectCurrentUser);

  // use navigate
  const navigate = useNavigate();

  // navigate to checkout page
  const goToCheckoutPage = useCallback(() => {
    if (!user) {
      alert('Please Sign In');
      dispatch(closeCart(false));
      return navigate('/auth');
    }

    dispatch(closeCart(false));
    navigate('/checkout');
  }, []);

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
