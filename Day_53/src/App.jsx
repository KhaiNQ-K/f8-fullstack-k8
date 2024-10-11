import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import Home from './pages/Home';
import ProductCart from './pages/ProductCart';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/cart" element={<ProductCart />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
