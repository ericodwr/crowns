import React, { useContext } from 'react';

import './Shop.styles.scss';

// Contexts
import { ProductsContext } from '../../../context/ProductsContext';
import ProductCard from '../../ProductCard/ProductCard';

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
