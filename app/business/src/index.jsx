import React from 'react';
import ReactDOM from 'react-dom/client';
import { Utils } from '@meta-core/utils/index';

const rootElement = document.getElementById('root');

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<div>{Utils}</div>);
}
