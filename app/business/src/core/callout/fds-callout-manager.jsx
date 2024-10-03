import React from 'react';
import { FDSCalloutContext } from '@meta-core/contexts/fds-callout-context';
import { executionEnvironment } from '@meta-core/utils/executionEnvironment';

import { BaseCalloutManager } from './base-callout-manager';
import { FDSCalloutImpl } from './fds-callout-impl';

const defaultInitialState = {
  anchorRef: null,
  anchorRootRefContext: {
    current: executionEnvironment.canUseDOM ? document.body : null,
  },
  animationContext: null,
  calloutID: null,
  scrollableAreaContext: [],
};

export function FDSCalloutManager({ children, initialState = defaultInitialState }) {
  return (
    <BaseCalloutManager context={FDSCalloutContext} implementation={FDSCalloutImpl} initialState={initialState}>
      {children}
    </BaseCalloutManager>
  );
}
