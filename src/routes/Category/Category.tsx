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
import ProductCard from '../../components/product-card/ProductCard.tsx';
import Spinner from '../../components/spinner/Spinner';

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  // get redux data
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  // get value params
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams;

  // states
  const [products, setProducts] = useState(categoriesMap[category]);

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
