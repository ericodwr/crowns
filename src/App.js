import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/Navigation/Navigation';
import Home from './routes/home/Home';
import Authentication from './routes/Authentication/Authentication';
import Shop from './routes/Shop/Shop';
import Checkout from './routes/Checkout/Checkout';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="shop/*" element={<Shop />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
