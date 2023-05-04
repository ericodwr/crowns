import React, { useState, useEffect } from 'react';

// get params
import { useParams } from 'react-router-dom';

// redux data
import { useSelector } from 'react-redux';
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/categories.selector';

// styles and components
import './category.styles.scss';
import ProductCard from '../../components/product-card/ProductCard';
import Spinner from '../../components/spinner/Spinner';

const Category = () => {
  // states
  const [products, setProducts] = useState([]);

  // get value params
  const { category } = useParams();

  // get redux data
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  console.log(isLoading);

  // tracking value from params and set to state
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <div className="category-title">
        <h2>{category}</h2>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Category;
