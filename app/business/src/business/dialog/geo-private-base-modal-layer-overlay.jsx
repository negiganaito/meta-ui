import React from 'react';
import { GeoBaseContextualLayerAnchorRoot } from '@meta-business/contextual/geo-base-contextual-layer-anchor-root';
import { FocusRegion } from '@meta-core/focus/focus-region';
import { focusScopeQueries } from '@meta-core/focus/focus-scope-queries';

import { GeoPrivateOverlay } from './geo-private-overlay';

export const GeoPrivateBaseModalLayerOverlay = ({ style, xstyle, children }) => {
  return (
    <GeoPrivateOverlay style={style} xstyle={xstyle}>
      <GeoBaseContextualLayerAnchorRoot>
        <FocusRegion.FocusRegion
          autoFocusQuery={focusScopeQueries.tabbableScopeQuery}
          autoRestoreFocus
          containFocusQuery={focusScopeQueries.tabbableScopeQuery}
          recoverFocusQuery={focusScopeQueries.tabbableScopeQuery}
        >
          {children}
        </FocusRegion.FocusRegion>
      </GeoBaseContextualLayerAnchorRoot>
    </GeoPrivateOverlay>
  );
};
