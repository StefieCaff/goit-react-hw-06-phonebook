import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import './index.css';
import store from './redux/store.js'

Notify.init({
  width: '300px',
  position: 'center-top',
  clickToClose: false,
  useIcon: true,
  pauseOnHover: true,
});

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
