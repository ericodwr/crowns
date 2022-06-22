import { createContext, useState, useEffect } from 'react';

// Firebase utils
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

// Context data
export const CategoriesContext = createContext({
  categoriesMap: {},
});

// Provider
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // get data from firestore/database
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = {
    categoriesMap,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
