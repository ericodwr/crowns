import React from 'react';

import './Home.styles.scss';

import categories from '../../../categories.json';
import CategoryItem from '../../CategoryItem/CategoryItem';

const Home = () => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Home;
