import React from 'react';

import { getGeoAndCometModalCompatible } from '../utils';

import { GeoEnableDataVizAnimationProvider } from './geo-enable-data-viz-animation-provider';

export const BusinessCometApp = () => {
  return (
    <GeoAppShell isModalBlockerEnabled={false} isNextThemeEnabled isSSRSafe={false}>
      <GeoEnableDataVizAnimationProvider isAnimationEnabled>
        <CometAppShell>
          <CometToasterRoot>
            <CometPageTransitioning />
            <CometAppViewStack
              baseView={
                <CometBackupPlaceholder fallback={null}>
                  <BusinessCometAppMainContentAreaRenderer />
                </CometBackupPlaceholder>
              }
              useBodyAsPortalsContainer={getGeoAndCometModalCompatible()}
            />
          </CometToasterRoot>
        </CometAppShell>
      </GeoEnableDataVizAnimationProvider>
    </GeoAppShell>
  );
};
