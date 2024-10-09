import ReactDOM from 'react-dom/client';
import { BusinessCometBuildRoot } from '@meta-business/shell/business-comet-build-root';
import { BUIStyleXSheet } from '@meta-business/theme/bui-stylex-sheet';
import { ErrorGuard } from '@meta-core/error/error-guard';
import { CometNetworkStatusToast } from '@meta-core/network/comet-network-status-toast';

import { router } from './routes/router';

const rootElement = document.getElementById('root');

if (!rootElement.innerHTML) {
  ErrorGuard.applyWithGuard(() => CometNetworkStatusToast.subscribe(), null, []);

  // JSScheduler.scheduleSpeculativeCallback(() => {
  //   WebStorageMonster.schedule();
  // });

  BUIStyleXSheet.inject();

  const root = ReactDOM.createRoot(rootElement);
  root.render(<BusinessCometBuildRoot router={router} />);
}

// GeoStyleXDefaultSheet <- GeoPrivateDefaultTheme <- GeoPrivateThemeContext <- GeoNextThemeProvider
// GeoPrivateDefaultTheme
// BUIStyleXSheet
// makeBUIStandardComponent
