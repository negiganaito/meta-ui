import React from 'react';
import { CometErrorBoundary } from '@meta-core/error/comet-error-boundary';
import { CometBackupPlaceholder } from '@meta-core/placeholder/comet-backup-placeholder';
import { CometHeroInteractionWithDiv } from '@meta-core/placeholder/comet-hero-interaction-with-div';

import { CometPlatformAppWrapper } from './comet-platform-app-wrapper';

export function BuildCometRootComponent({ children, initialProps, options }) {
  const {
    TopLevelWrapper,
    OtherRootComponents: {
      CookieConsentDialog,
      DebugOwlDisplay,
      KeyCommandNub,
      MemoryOverlay,
      ProductAttributionDebugger,
      Redblock,
      UncaughtErrorFallback,
    },
    UIStateProviders: {
      ChameleonThemeProvider,
      DarkModeStateProvider,
      DensityModeStateProvider,
      KeyboardSettingsStateProvider,
    } = {},

    // temp
    RelayEnvironmentFactoryProvider = React.Fragment,
    CometRouterStateProvider = React.Fragment,
  } = options;

  // const {
  //   initialActorID = CurrentUser.getID(),
  //   initialLoadTraceId,
  //   relayEnvironmentFactory,
  //   interactionQPLEvents = CometInteractionTracingQPLConfigContext.defaultInteractionQPLEvents,
  //   disableTimeSpentLogging,
  // } = initialProps;

  // const ActorProvider = Actor.ActorProvider;
  // const InteractionTracingQPLContextProvider =
  //   CometInteractionTracingQPLConfigContext.CometInteractionTracingQPLConfigContextProvider;

  return () => {
    return (
      <TopLevelWrapper>
        <CometPlatformAppWrapper
          KeyboardSettingsStateProvider={KeyboardSettingsStateProvider}
          UncaughtErrorFallback={UncaughtErrorFallback}
        >
          <RelayEnvironmentFactoryProvider>
            <CometRouterStateProvider>
              <DarkModeStateProvider>
                <ChameleonThemeProvider>
                  <DensityModeStateProvider>
                    <CometBackupPlaceholder fallback={null}>
                      <CometHeroInteractionWithDiv interactionDesc="initial load">
                        {children}
                        {CookieConsentDialog ? (
                          <CometErrorBoundary>
                            <CookieConsentDialog />
                          </CometErrorBoundary>
                        ) : null}
                        {KeyCommandNub ? (
                          <CometErrorBoundary>
                            <KeyCommandNub />
                          </CometErrorBoundary>
                        ) : null}
                      </CometHeroInteractionWithDiv>
                    </CometBackupPlaceholder>
                    {/* CometDOMOnlyBoundary */}
                  </DensityModeStateProvider>
                </ChameleonThemeProvider>
              </DarkModeStateProvider>
            </CometRouterStateProvider>
          </RelayEnvironmentFactoryProvider>
        </CometPlatformAppWrapper>
      </TopLevelWrapper>
    );
  };
}
