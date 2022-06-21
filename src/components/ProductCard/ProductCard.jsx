import React, { useContext } from 'react';

import './ProductCard.styles.scss';

// Context
import { CartContext } from '../../context/CartContext';

// Components
import Button from '../Button/Button';

const ProductCard = ({ product }) => {
  const { price, name, imageUrl } = product;

  // Context
  const { addItemToCart } = useContext(CartContext);

  // helper function context
  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={'inverted'} onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
