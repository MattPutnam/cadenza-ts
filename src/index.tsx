import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';

import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import 'sanitize.css/sanitize.css';

import { App } from './app';
import { configureAppStore } from './store/configureStore';
import './locales/i18n';

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HelmetProvider>
  </Provider>,
  MOUNT_NODE
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}
