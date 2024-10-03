import React, { forwardRef } from 'react';
import { testID } from '@meta-core/utils/test-id';
import stylex from '@stylexjs/stylex';

import { LegacyHidden } from './legacy-hidden';

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").BaseViewReactProps>
 */
export const BaseView = forwardRef((props, ref) => {
  const { children, hidden, suppressHydrationWarning, xstyle, testid, ...rest } = props;

  const isHidden = hidden === true;

  return (
    <LegacyHidden
      {...testID(testid)}
      htmlAttributes={{
        className: stylex(styles.root, xstyle, isHidden && styles.hidden),
        ...rest,
      }}
      mode={isHidden ? 'hidden' : 'visible'}
      ref={ref}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      {children}
    </LegacyHidden>
  );
});

BaseView.displayName = 'BaseView.react';

const styles = stylex.create({
  hidden: {
    display: 'none',
  },

  root: {
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 0,
  },
});
