import React, { useContext, useMemo, useState } from 'react';
import { GeoGlimmerStaggeringContext } from '@meta-business/contexts/geo-glimmer-staggering-context';
import { GeoPrivateGlimmerAnimationStartTimeContext } from '@meta-business/contexts/geo-private-glimmer-animation-start-time-context';
import { GeoTransientModalProvider } from '@meta-business/dialog/geo-transient-modal-provider';
import { DocumentTranslationStatusProvider } from '@meta-business/text/document-translation-status-provider';
import { GeoNextThemeProvider } from '@meta-business/theme/geo-next-theme-provider';
import { GeoToasterProvider } from '@meta-business/toaster/geo-toaster-provider';
import { GeoBaseHintSingletonContextProvider } from '@meta-business/unknown/geo-base-hint-singleton-context-provider';
import { GeoSSRSafeIdsContext } from '@meta-business/utils/geo-ssr-safe-ids-context';

const defaultGlimmerStaggering = true;

export const GeoAppShell = ({
  children,
  isModalBlockerEnabled,
  isNextThemeEnabled,
  isSSRSafe,
  themeProvider: ThemeProvider,
}) => {
  const ssrSafeContext = useContext(GeoSSRSafeIdsContext);
  const ssrSafe = isSSRSafe ?? ssrSafeContext;

  const [animationStartTime, setAnimationStartTime] = useState(undefined);

  const animationContextValue = useMemo(
    () => ({
      animationStartTime,
      setAnimationStartTime,
    }),
    [animationStartTime, setAnimationStartTime],
  );

  let appShellContent = (
    <GeoBaseHintSingletonContextProvider>
      <GeoSSRSafeIdsContext.Provider value={ssrSafe}>
        <GeoPrivateGlimmerAnimationStartTimeContext.Provider value={animationContextValue}>
          <GeoGlimmerStaggeringContext.Provider value={defaultGlimmerStaggering}>
            <DocumentTranslationStatusProvider>
              <GeoToasterProvider>
                <GeoTransientModalProvider>{children}</GeoTransientModalProvider>
              </GeoToasterProvider>
            </DocumentTranslationStatusProvider>
          </GeoGlimmerStaggeringContext.Provider>
        </GeoPrivateGlimmerAnimationStartTimeContext.Provider>
      </GeoSSRSafeIdsContext.Provider>
    </GeoBaseHintSingletonContextProvider>
  );

  if (ThemeProvider) {
    appShellContent = <ThemeProvider>{appShellContent}</ThemeProvider>;
  }

  // if (require("cr:959") != null) {
  //     appShellContent = <require("cr:959")>{appShellContent}</require("cr:959")>;
  // }

  if (isNextThemeEnabled) {
    appShellContent = <GeoNextThemeProvider>{appShellContent}</GeoNextThemeProvider>;
  }

  return appShellContent;
};
