import React, { useContext } from 'react';

// context
import { CartContext } from '../../context/CartContext';

// components and styles
import Button from '../button/Button';
import './product-card.styles.scss';

const ProductCard = ({ product }) => {
  const { id, name, imageUrl, price } = product;

  // context
  const { addItemToCart } = useContext(CartContext);

  // helper func
  const addProductToCart = () => addItemToCart(product);

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
