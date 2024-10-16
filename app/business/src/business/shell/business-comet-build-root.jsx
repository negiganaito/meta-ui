import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { CometDensityModeStateProvider as DensityModeStateProvider } from '@meta-core/contexts/comet-density-mode-state-provider';
import { CometErrorBoundary } from '@meta-core/error/comet-error-boundary';
import { CometBackupPlaceholder } from '@meta-core/placeholder/comet-backup-placeholder';
import { CometHeroInteractionWithDiv } from '@meta-core/placeholder/comet-hero-interaction-with-div';
import { RelayEnvironment } from '@meta-core/relay/environment';

// import { BusinessCometApp } from './business-comet-app';
import { CometPlatformAppWrapper } from './comet-platform-app-wrapper';

const Component = {
  TopLevelWrapper: React.Fragment,
  RelayEnvironmentFactoryProvider: RelayEnvironment,
  CometRouterStateProvider: React.Fragment,
  DarkModeStateProvider: React.Fragment,
  ChameleonThemeProvider: React.Fragment,
};

const KeyboardSettingsStateProvider = undefined;
const UncaughtErrorFallback = undefined;

const CookieConsentDialog = undefined;
const KeyCommandNub = undefined;

export const BusinessCometBuildRoot = ({ router }) => {
  return (
    <Component.TopLevelWrapper>
      <CometPlatformAppWrapper
        KeyboardSettingsStateProvider={KeyboardSettingsStateProvider}
        UncaughtErrorFallback={UncaughtErrorFallback}
      >
        <Component.RelayEnvironmentFactoryProvider>
          <Component.CometRouterStateProvider>
            <Component.DarkModeStateProvider>
              <Component.ChameleonThemeProvider>
                <DensityModeStateProvider>
                  <CometBackupPlaceholder fallback={null}>
                    <CometHeroInteractionWithDiv interactionDesc="initial load">
                      {/* <BusinessCometApp>
                        <RouterProvider router={router} />
                      </BusinessCometApp> */}
                      <RouterProvider router={router} />
                      {CookieConsentDialog && (
                        <CometErrorBoundary>
                          <CookieConsentDialog />
                        </CometErrorBoundary>
                      )}
                      {KeyCommandNub && (
                        <CometErrorBoundary>
                          <KeyCommandNub />
                        </CometErrorBoundary>
                      )}
                    </CometHeroInteractionWithDiv>
                  </CometBackupPlaceholder>
                  {/* CometDOMOnlyBoundary */}
                </DensityModeStateProvider>
              </Component.ChameleonThemeProvider>
            </Component.DarkModeStateProvider>
          </Component.CometRouterStateProvider>
        </Component.RelayEnvironmentFactoryProvider>
      </CometPlatformAppWrapper>
    </Component.TopLevelWrapper>
  );

  // return BuildCometRootComponent(
  //   <BusinessCometApp>
  //     <RouterProvider router={router} />
  //   </BusinessCometApp>,
  //   {},
  //   {
  //     OtherRootComponents: {
  //       // CookieConsentDialog: c('FacebookCometCookieConsent.react'),
  //       // KeyCommandNub: c('CometKeyCommandNub.react'),
  //       // Redblock: b('cr:881053'),
  //       // UncaughtErrorFallback: c('CometFBUncaughtErrorDeferred.react'),
  //     },
  //     UIStateProviders: {
  //       ChameleonThemeProvider: React.Fragment,
  //       DarkModeStateProvider: React.Fragment,
  //       DensityModeStateProvider: CometDensityModeStateProvider,
  //       KeyboardSettingsStateProvider: undefined,
  //     },
  //   },
  // );
};
