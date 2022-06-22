import React from 'react';
import './HomeItem.styles.scss';

import { Link } from 'react-router-dom';

const HomeItem = ({ category }) => {
  return (
    <div key={category.id} className="home-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      />
      <Link className="body" to={`shop/${category.title}`}>
        <h2>{category.title}</h2>
        <p>Shop Now</p>
      </Link>
    </div>
  );
};

export default HomeItem;
