import React from 'react';

// context
import { addItemToCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';

// components and styles
import Button from '../button/Button';
import './product-card.styles.scss';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../store/user/user.selector';

const ProductCard = ({ product }) => {
  const { id, name, imageUrl, price } = product;

  // redux
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectCurrentUser);

  // router
  const navigate = useNavigate();

  // helper func
  const addProductToCart = () => {
    if (!user) {
      alert('Please Sign In to make order');
      return navigate('/auth');
    }
    return dispatch(addItemToCart(cartItems, product));
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={'inverted'} onClick={addProductToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
