import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TreeProvider } from './Components/TreeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TreeProvider>
      <App />
    </TreeProvider>
  </React.StrictMode>
);