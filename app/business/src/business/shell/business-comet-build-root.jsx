import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { CometDensityModeStateProvider } from '@meta-core/contexts/comet-density-mode-state-provider';

import { buildCometRootComponent } from './build-comet-root-component';
import { BusinessCometApp } from './business-comet-app';

export const BusinessCometBuildRoot = () => {
  return buildCometRootComponent(
    <BusinessCometApp>
      <RouterProvider router={router} />
    </BusinessCometApp>,
    {},
    {
      OtherRootComponents: {
        // CookieConsentDialog: c('FacebookCometCookieConsent.react'),
        // KeyCommandNub: c('CometKeyCommandNub.react'),
        // Redblock: b('cr:881053'),
        // UncaughtErrorFallback: c('CometFBUncaughtErrorDeferred.react'),
      },
      UIStateProviders: {
        ChameleonThemeProvider: React.Fragment,
        DarkModeStateProvider: React.Fragment,
        DensityModeStateProvider: CometDensityModeStateProvider,
        KeyboardSettingsStateProvider: undefined,
      },
    },
  );
};
