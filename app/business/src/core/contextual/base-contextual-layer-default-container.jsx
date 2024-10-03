import React, { forwardRef } from 'react';
import { LegacyHidden } from '@meta-core/layout/legacy-hidden';
import { testID } from '@meta-core/utils/test-id';
import stylex from '@stylexjs/stylex';

export const BaseContextualLayerDefaultContainer = forwardRef(
  ({ children, hidden, stopClickPropagation, testid, xstyle }, ref) => {
    return (
      <LegacyHidden
        htmlAttributes={{
          ...testID(testid),
          className: stylex(xstyle),
          onClick: stopClickPropagation ? (event) => event.stopPropagation() : undefined,
        }}
        mode={hidden ? 'hidden' : 'visible'}
        ref={ref}
      >
        {children}
      </LegacyHidden>
    );
  },
);

BaseContextualLayerDefaultContainer.displayName = 'BaseContextualLayerDefaultContainer';
