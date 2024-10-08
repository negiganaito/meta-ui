import ReactDOM from 'react-dom/client';
import { BusinessCometBuildRoot } from '@meta-business/shell/business-comet-build-root';
import { BUIStyleXSheet } from '@meta-ui/business/theme';

import { router } from './routes/router';

const rootElement = document.getElementById('root');

if (!rootElement.innerHTML) {
  BUIStyleXSheet.inject();

  const root = ReactDOM.createRoot(rootElement);
  root.render(BusinessCometBuildRoot(router));
}
