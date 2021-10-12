import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'sanitize.css/sanitize.css';

import React from 'react';

import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import { App } from './app';
import './locales/i18n';
import { MidiInterfaceProvider } from './midi';
import { AppStateProvider } from './state';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <AppStateProvider>
    <MidiInterfaceProvider>
      <HelmetProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HelmetProvider>
    </MidiInterfaceProvider>
  </AppStateProvider>,
  MOUNT_NODE
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}
