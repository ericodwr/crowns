import { createContext, useEffect, useState } from 'react';

import {
  getCategoriesAndDocuments,
} from '../utils/firebase/firebase.utils';

// import SHOP_DATA from '../shop-data';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  /*
  Adding data to firestore

  useEffect(() => {
    addCollectionAndDocuments('categories', SHOP_DATA);
  }, []);
  */

  // fetch database from firebase
  useEffect(() => {
    const fetchData = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoriesMap);
    };

    fetchData();
  }, []);

  const value = {
    categoriesMap,
    setCategoriesMap,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
