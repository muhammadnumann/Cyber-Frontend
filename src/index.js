import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MainProvider } from './context/MainContext';
import { store } from './store';
import { Provider as ReduxProvider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <MainProvider>
        <App />
      </MainProvider>
    </ReduxProvider>
  </React.StrictMode>
);
