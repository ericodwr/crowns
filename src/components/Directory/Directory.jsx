import React from 'react';
import './Directory.styles.scss';

import categories from '../../categories.json';
import CategoryItem from '../CategoryItem/CategoryItem';

const Directory = () => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
