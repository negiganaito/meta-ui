import React, { useContext, useMemo, useState } from 'react';
import { DocumentTranslationStatusProvider } from '@meta-business/text/document-translation-status-provider';
import { GeoSSRSafeIdsContext } from '@meta-business/utils/geo-ssr-safe-ids-context';

const defaultGlimmerStaggering = true;

export const GeoAppShell = ({ children, isModalBlockerEnabled, isNextThemeEnabled, isSSRSafe, themeProvider }) => {
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
                {/* later */}
                <GeoTransientModalProvider>{children}</GeoTransientModalProvider>
              </GeoToasterProvider>
            </DocumentTranslationStatusProvider>
          </GeoGlimmerStaggeringContext.Provider>
        </GeoPrivateGlimmerAnimationStartTimeContext.Provider>
      </GeoSSRSafeIdsContext.Provider>
    </GeoBaseHintSingletonContextProvider>
  );

  // if (themeProvider != null) {
  //     appShellContent = <themeProvider>{appShellContent}</themeProvider>;
  // }

  // if (require("cr:959") != null) {
  //     appShellContent = <require("cr:959")>{appShellContent}</require("cr:959")>;
  // }

  // if (require("cr:2575") != null && isNextThemeEnabled === true) {
  //     appShellContent = <require("cr:2575")>{appShellContent}</require("cr:2575")>;
  // }

  return appShellContent;
};
