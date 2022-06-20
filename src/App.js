import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/routes/Navigation/Navigation';
import Home from './components/routes/home/Home';
import Authentication from './components/routes/Authentication/Authentication';

const Shop = () => (
  <div>
    <div>
      <h1>I am Shop</h1>
    </div>
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
