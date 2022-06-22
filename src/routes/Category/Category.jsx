import React, { useContext, useState, useEffect } from 'react';

import './Category.styles.scss';

// Router
import { useParams } from 'react-router-dom';

// Context
import { CategoriesContext } from '../../context/CategoriesContext';
import ProductCard from '../../components/ProductCard/ProductCard';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <div className="category-container">
      <h2>{category.toLocaleUpperCase()}</h2>
      <div className="category-content">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
