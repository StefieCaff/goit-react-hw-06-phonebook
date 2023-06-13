import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { Provider } from 'react-redux';
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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
