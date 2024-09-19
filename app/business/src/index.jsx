import React from 'react';
import ReactDOM from 'react-dom/client';
import { env } from '@meta-core/utils/index';

const rootElement = document.getElementById('root');

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<div>{env.start}</div>);
}
