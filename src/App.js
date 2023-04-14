import { Routes, Route } from 'react-router-dom';

import Home from './routes/Home/Home';
import Navigation from './routes/Navigation/Navigation';
import Shop from './routes/Shop/Shop';
import SignIn from './routes/sign-in/SignIn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
