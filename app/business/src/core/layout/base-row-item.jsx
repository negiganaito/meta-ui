import React, { forwardRef, useContext } from 'react';
import { BaseRowContext } from '@meta-core/contexts/base-row-context';
import stylex from '@stylexjs/stylex';

import { BaseView } from './base-view';

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").BaseRowItemReactProps>
 */
export const BaseRowItem = forwardRef((props, ref) => {
  const { verticalAlign, xstyle, expanding = false, useDeprecatedStyles = false, ...rest } = props;

  const { columns, wrap } = useContext(BaseRowContext);

  return (
    <BaseView
      {...rest}
      ref={ref}
      xstyle={[
        useDeprecatedStyles ? styles.item_DEPRECATED : styles.item,
        expanding && styles.expanding,
        expanding && wrap !== 'none' && styles.expandingWithWrap,
        columns > 0 && columnStyles[columns],
        verticalAlign && verticalAlignStyles[verticalAlign],
        xstyle,
      ]}
    />
  );
});

BaseRowItem.displayName = 'BaseRowItem.react';

const styles = stylex.create({
  expanding: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
  },
  expandingWithWrap: {
    flexBasis: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    maxWidth: '100%',
    minWidth: 0,
  },
  // eslint-disable-next-line camelcase
  item_DEPRECATED: {
    maxWidth: '100%',
    minWidth: 0,
  },
});

const columnStyles = stylex.create({
  0: {
    flexBasis: 'auto',
  },
  1: {
    flexBasis: '100%',
  },
  2: {
    flexBasis: '50%',
  },
  3: {
    flexBasis: '(100 / 3)%',
  },
  4: {
    flexBasis: '25%',
  },
  5: {
    flexBasis: '20%',
  },
  6: {
    flexBasis: '(100 / 6)%',
  },
  7: {
    flexBasis: '(100 / 7)%(100 / 7)%',
  },
  8: {
    flexBasis: '12.5%',
  },
  9: {
    flexBasis: '(100 / 9)%',
  },
  10: {
    flexBasis: '10%',
  },
});

const verticalAlignStyles = stylex.create({
  bottom: {
    alignSelf: 'flex-end',
  },
  center: {
    alignSelf: 'center',
  },
  stretch: {
    alignSelf: 'stretch',
  },
  top: {
    alignSelf: 'flex-start',
  },
});
