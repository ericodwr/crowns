import React from 'react';

// redux
import {
  addItemToCart,
  deleteItemFromCart,
  removeItemFromCart,
} from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

// styles
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity, id } = cartItem;

  // redux
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // function handler
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const decreaseItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));
  const removeHandler = () => dispatch(deleteItemFromCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>

      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decreaseItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>

      <div className="remove-button" onClick={removeHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
