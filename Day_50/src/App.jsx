import Login from './features/Auth/components/Login';
import Home from './features/Home';
import { useAuth } from './hooks/useAuth';

function App() {
  const { authData } = useAuth();
  return (
    <div className="container mx-auto">
      {authData ? (
        <div>
          <Home />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
