import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { VyraProvider } from './context/VyraContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VyraProvider>
      <App />
    </VyraProvider>
  </React.StrictMode>
);
