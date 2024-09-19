import DefaultLayout from './layout/DefaultLayout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="h-full">
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    </div>
  );
}

export default App;
