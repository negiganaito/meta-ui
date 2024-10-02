import React, { forwardRef, useContext, useMemo } from 'react';
import { CometColumnContext } from '@meta-ui/core/contexts';
import stylex from '@stylexjs/stylex';
import UserAgent from 'fbjs/lib/UserAgent';

import { BaseView } from './base-view';
import { CometColumnItem } from './comet-column-item';

// eslint-disable-next-line no-unused-vars
const isIE11 = UserAgent.isBrowser('IE >= 11');

/**
 * @param {import("./types").CometColumnProps} props - The props for the component.
 */
const _CometColumn = (props, ref) => {
  const {
    align = null,
    children,
    expanding = false,
    hasDividers = false,
    paddingHorizontal = null,
    paddingTop,
    paddingVertical = 0,
    spacing = null,
    verticalAlign = 'top',
    xstyle,
    ...rest
  } = props;

  const columnContext = useContext(CometColumnContext);

  const contextValues = useMemo(() => {
    return {
      align,
      hasDividers,
      paddingHorizontal,
      spacing,
    };
  }, [align, hasDividers, paddingHorizontal, spacing]);

  const renderColumn = (
    <BaseView
      {...rest}
      ref={ref}
      xstyle={[
        styles.root,
        expanding === true && styles.expanding,
        // expanding === true && [
        //   styles.expanding,
        //   isIE11 && styles.expandingIE11,
        // ],
        paddingStyles[paddingVertical],
        paddingTop && paddingVerticalStyles[paddingTop],
        xstyle,
      ]}
    >
      <BaseView xstyle={[styles.inner, verticalAlign !== 'top' && justifyContentStyles[verticalAlign]]}>
        <CometColumnContext.Provider value={contextValues}>{children}</CometColumnContext.Provider>
      </BaseView>
    </BaseView>
  );

  if (columnContext) {
    return <CometColumnItem expanding={expanding ?? undefined}>{renderColumn}</CometColumnItem>;
  }

  return renderColumn;
};

export const CometColumn = forwardRef(_CometColumn);

const styles = stylex.create({
  expanding: {
    flexBasis: '100%',
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
  },
  expandingIE11: {
    flexBasis: 'auto',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: 0,
  },
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    maxWidth: '100%',
  },
});

const paddingVerticalStyles = stylex.create({
  0: {
    paddingTop: 0,
  },
  4: {
    paddingTop: '4px',
  },
  8: {
    paddingTop: '8px',
  },
  12: {
    paddingTop: '12px',
  },
  16: {
    paddingTop: '16px',
  },
  20: {
    paddingTop: '20px',
  },
});

const paddingStyles = stylex.create({
  4: {
    paddingTop: '4px',
    paddingBottom: '4px',
  },
  8: {
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  12: {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  16: {
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  20: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
});

const justifyContentStyles = stylex.create({
  bottom: {
    justifyContent: 'flex-end',
  },
  center: {
    justifyContent: 'center',
  },
  'space-between': {
    justifyContent: 'space-between',
  },
});
