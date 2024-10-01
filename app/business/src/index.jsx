import React from 'react';
import ReactDOM from 'react-dom/client';
import { BUIStyleXSheet } from '@meta-ui/business/theme';

import { App } from './app';

const rootElement = document.getElementById('root');

if (!rootElement.innerHTML) {
  BUIStyleXSheet.inject();

  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
