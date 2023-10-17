import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Error from './pages/Error/Error.js'
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter, useNavigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
   
    
  </React.StrictMode>
);
