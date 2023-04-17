import React from 'react';

import DirectoryItem from '../category-item/DirectoryItem';
import jsonData from '../../categories.json';

import './categories.styles.scss';

const Directory = () => {
  return (
    <div className="categories-container">
      {jsonData.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
