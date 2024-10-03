import { useAuth0 } from '@auth0/auth0-react';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <main className="flex justify-center items-center">
      {isAuthenticated ? <Profile /> : <Login />}
    </main>
  );
}

export default App;
