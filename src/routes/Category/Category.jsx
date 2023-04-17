import React, { useContext, useState, useEffect } from 'react';

// get params
import { useParams } from 'react-router-dom';

// context
import { CategoriesContext } from '../../context/CategoriesContext';

// styles and components
import './category.styles.scss';
import ProductCard from '../../components/product-card/ProductCard';

const Category = () => {
  // states
  const [products, setProducts] = useState([]);

  // get value params
  const { category } = useParams();

  // get context
  const { categoriesMap } = useContext(CategoriesContext);

  // tracking value from params and set to state
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div className="category-container">
      {products?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Category;
