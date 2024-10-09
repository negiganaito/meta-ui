import React from 'react';
import { CometPlaceholder } from '@meta-core/placeholder/comet-placeholder';

import { CometTooltipDeferredImpl } from './comet-tooltip-deferred-impl';

export function CometTooltipImpl(props) {
  return (
    <CometPlaceholder fallback={null}>
      <CometTooltipDeferredImpl {...props} />
    </CometPlaceholder>
  );
}
