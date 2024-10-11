import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer position="top-right" autoClose={2000} className="!top-16" />
    </BrowserRouter>
  </StrictMode>
);
