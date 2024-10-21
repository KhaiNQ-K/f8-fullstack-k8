import { Route, Routes } from 'react-router-dom';
import BoardPage from './pages/Board/BoardPage';
import Login from './pages/Auth/Login';
import AuthMiddleware from '@/middleware/AuthMiddleware';
function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/login"></Route>
      <Route element={<AuthMiddleware />} path="/">
        <Route element={<BoardPage />} index></Route>
      </Route>
    </Routes>
  );
}

export default App;
