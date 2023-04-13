import React from 'react';

import CategoryItem from '../category-item/CategoryItem';
import jsonData from '../../categories.json';

import './categories.styles.scss';

const Directory = () => {
  return (
    <div className="categories-container">
      {jsonData.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
