import React, { useContext } from 'react';

import './CategoriesPreview.styles.scss';

// Contexts
import { CategoriesContext } from '../../context/CategoriesContext';

// Components
import CategoryPreview from '../../components/CategoryPreview/CategoryPreview';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} products={products} title={title} />
        );
      })}
    </div>
  );
};

export default CategoriesPreview;
