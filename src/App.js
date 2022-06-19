import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/routes/Navigation/Navigation';
import Home from './components/routes/home/Home';
import SignIn from './components/routes/SignIn/SignIn';

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
        <Route path="signin" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
