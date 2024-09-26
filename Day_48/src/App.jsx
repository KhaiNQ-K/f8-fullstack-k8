import Login from './features/Login';
import Todos from './features/Todos';
import { useAuth } from './hooks/useAuth';
function App() {
  const isAuthenticated = useAuth();
  if (!isAuthenticated) return <Login />;
  return (
    <>
      <div className="container mx-auto">
        <Todos />
      </div>
    </>
  );
}

export default App;
