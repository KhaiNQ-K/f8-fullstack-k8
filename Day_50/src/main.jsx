import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme.js';
import AuthProvider from './provider/AuthProvider.jsx';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartProvider from './provider/CartProvider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
