import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { VITE_APP_AUTH0_DOMAIN, VITE_APP_AUTH0_CLIENT_ID } = import.meta.env;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={VITE_APP_AUTH0_DOMAIN}
      clientId={VITE_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      className="z-50"
    />
  </StrictMode>
);
