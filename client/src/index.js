import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// 👇 add the extensions / explicit paths
import App from './App.jsx';
import store from './store/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
