import ReactDOM from 'react-dom/client';
import { BusinessCometBuildRoot } from '@meta-business/shell/business-comet-build-root';
import { ErrorGuard } from '@meta-core/error/error-guard';
import { CometNetworkStatusToast } from '@meta-core/network/comet-network-status-toast';

// import { BUIStyleXSheet } from '@meta-ui/business/theme';
import { router } from './routes/router';

const rootElement = document.getElementById('root');

if (!rootElement.innerHTML) {
  ErrorGuard.applyWithGuard(
    () => {
      return CometNetworkStatusToast.subscribe();
    },
    null,
    [],
  );

  // JSScheduler.scheduleSpeculativeCallback(() => {
  //   WebStorageMonster.schedule();
  // });

  // BUIStyleXSheet.inject();

  const root = ReactDOM.createRoot(rootElement);
  root.render(BusinessCometBuildRoot(router));
}

// GeoStyleXDefaultSheet <- GeoPrivateDefaultTheme <- GeoPrivateThemeContext <- GeoNextThemeProvider
// GeoPrivateDefaultTheme
// BUIStyleXSheet
// makeBUIStandardComponent
