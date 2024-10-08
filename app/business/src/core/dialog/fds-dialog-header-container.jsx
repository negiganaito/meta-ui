import React from 'react';
import { html } from 'react-strict-dom';
import { focusScopeQueries } from '@meta-core/focus/focus-scope-queries';
import { XPlatReactFocusRegion } from '@meta-core/focus/xplat-react-focus-region';
import { XPlatReactEnvironment } from '@meta-core/react-utils/xplat-react-environment';
import { BaseDivider } from '@meta-core/unknown/base-divider';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    backgroundColor: 'var(--card-background)',
    width: '100%',
  },

  containerNative: {
    flexShrink: 0,
  },

  content: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'space-between',
    minHeight: '60px',
    position: 'relative',
  },
});

// CHANGED
// @Becareful
export const FDSDialogHeaderContainer = ({
  addOnBottom,
  children,
  containerXstyle,
  contentXstyle,
  id,
  withDivider = false,
  xstyle,
}) => {
  return (
    <XPlatReactFocusRegion autoFocusQuery={focusScopeQueries.tabbableFirstHeaderSecondScopeQuery}>
      <html.div style={[styles.container, !XPlatReactEnvironment.isWeb() && styles.containerNative, containerXstyle]}>
        <html.div id={id} style={[styles.content, contentXstyle]}>
          {children}
        </html.div>
        {withDivider && <BaseDivider />}
        {addOnBottom}
      </html.div>
    </XPlatReactFocusRegion>
  );
};
