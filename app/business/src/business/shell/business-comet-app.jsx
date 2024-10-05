import React from 'react';
import { GeoEnableDataVizAnimationProvider } from '@meta-business/theme/geo-enable-data-viz-animation-provider';
import { getGeoAndCometModalCompatible } from '@meta-business/utils/get-geo-and-comet-modal-compatible';
import { CometBackupPlaceholder } from '@meta-core/placeholder/comet-backup-placeholder';
import { CometToasterRoot } from '@meta-core/toast/comet-toaster-root';

import { BusinessCometAppMainContentAreaRenderer } from './business-comet-app-main-content-area-renderer';
import { CometAppShell } from './comet-app-shell';
import { CometAppViewStack } from './comet-app-view-stack';
import { GeoAppShell } from './geo-app-shell';

export const BusinessCometApp = () => {
  return (
    <GeoAppShell isModalBlockerEnabled={false} isNextThemeEnabled isSSRSafe={false}>
      <GeoEnableDataVizAnimationProvider isAnimationEnabled>
        <CometAppShell>
          <CometToasterRoot>
            {/* <CometPageTransitioning /> */}
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
