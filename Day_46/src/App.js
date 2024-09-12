import DefaultLayout from './layouts/DefaultLayout';
import { routes } from './router';
import Router from './utils/Router';
import './styles/App.css';
export const App = () => {
  const router = new Router(routes, DefaultLayout);
  return router;
};
