import React from 'react';

import './Home.styles.scss';

import categories from '../../categories.json';
import HomeItem from '../../components/HomeItem/HomeItem';

const Home = () => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <HomeItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Home;
