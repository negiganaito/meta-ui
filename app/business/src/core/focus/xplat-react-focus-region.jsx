import React from 'react';

import { FocusRegion } from './focus-region';
import { focusScopeQueries } from './focus-scope-queries';

export function XPlatReactFocusRegion({ autoFocusQuery, autoRestoreFocus, recoverFocusQuery, children }) {
  return (
    <FocusRegion.FocusRegion
      autoFocusQuery={autoFocusQuery ?? focusScopeQueries.headerOrTabbableScopeQuery}
      autoRestoreFocus={autoRestoreFocus}
      recoverFocusQuery={recoverFocusQuery}
    >
      {children}
    </FocusRegion.FocusRegion>
  );
}
