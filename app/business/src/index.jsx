import React from 'react';
import ReactDOM from 'react-dom/client';
import { GeoVStack } from '@meta-ui/business/layout';
import { BUIStyleXSheet } from '@meta-ui/business/theme';
import { env } from '@meta-ui/core/utils';

const rootElement = document.getElementById('root');

console.log({ GeoVStack });

if (!rootElement.innerHTML) {
  BUIStyleXSheet.inject();

  const root = ReactDOM.createRoot(rootElement);
  root.render(<div>{env.start}</div>);
}
