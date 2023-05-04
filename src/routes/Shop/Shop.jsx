import React, { useEffect } from 'react';

// Routing
import { Routes, Route } from 'react-router-dom';

// data
import { fetchCategoriesAsync } from '../../store/categories/categories.action';

// components
import CategoriesPreview from '../CategoriesPreview/CategoriesPreview';
import Category from '../Category/Category';
import { useDispatch } from 'react-redux';

const Shop = () => {
  /*
  Adding data to firestore

  useEffect(() => {
    addCollectionAndDocuments('categories', SHOP_DATA);
  }, []);
  */

  const dispatch = useDispatch();

  // fetch database from firebase using redux
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    // set Route for shop itself
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
