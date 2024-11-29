import React from 'react';
import ReactDOM from 'react-dom/client';  // Import 'react-dom/client' untuk createRoot
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Menggunakan createRoot dari React 18 untuk merender aplikasi
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrasi service worker untuk fungsionalitas PWA
serviceWorkerRegistration.register();
