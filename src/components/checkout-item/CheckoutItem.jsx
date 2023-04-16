import React, { useContext } from 'react';

// context
import { CartContext } from '../../context/CartContext';

// styles
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity, id } = cartItem;

  // context
  const { deleteItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  // function handler
  const addItemHandler = () => addItemToCart(cartItem);
  const decreaseItemHandler = () => removeItemFromCart(cartItem);
  const removeHandler = () => deleteItemFromCart(cartItem);

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
