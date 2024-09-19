import React from 'react';
import ReactDOM from 'react-dom/client';
import { BUIStyleXSheet } from '@meta-business/theme/index';
import { env } from '@meta-core/utils';

const rootElement = document.getElementById('root');

if (!rootElement.innerHTML) {
  BUIStyleXSheet.inject();

  const root = ReactDOM.createRoot(rootElement);
  root.render(<div>{env.start}</div>);
}
