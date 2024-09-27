import { forwardRef, useContext, useMemo } from 'react';
import { jsx } from 'react/jsx-runtime';
import { CometColumnContext, CometRowContext } from '@meta-core/contexts';
import stylex from '@stylexjs/stylex';

import { BaseRow } from './base-row';
import { CometColumnItem } from './comet-column-item';
import { CometRowItem } from './comet-row-item';

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").CometRowProps>
 */
export const CometRow = forwardRef((props, ref) => {
  const columnContext = useContext(CometColumnContext);
  const rowContext = useContext(CometRowContext);

  const defaultPaddingHorizontal = (!columnContext ? undefined : columnContext.paddingHorizontal) ? 0 : 12;
  const defaultSpacing = (!columnContext ? undefined : columnContext.spacing) ? 0 : 16;

  const {
    children,
    paddingHorizontal = defaultPaddingHorizontal, //
    paddingVertical = 0,
    paddingTop,
    spacing = 12,
    spacingHorizontal = spacing,
    spacingVertical = spacing,
    xstyle,
    ...rest
  } = props;

  const _paddingTop =
    paddingTop === undefined ? (props.paddingVertical === undefined ? defaultSpacing : null) : paddingTop;

  const newCometRowContextValue = useMemo(() => {
    return {
      spacingHorizontal,
      spacingVertical,
    };
  }, [spacingHorizontal, spacingVertical]);

  const row = jsx(BaseRow, {
    ...rest,
    ref,
    xstyle: [
      l[paddingHorizontal],
      n[paddingVertical],
      _paddingTop && m[_paddingTop],
      o[spacingHorizontal],
      p[spacingVertical],
      xstyle,
    ],
    children: jsx(CometRowContext.Provider, {
      value: newCometRowContextValue,
      children,
    }),
  });

  if (rowContext) {
    return jsx(CometRowItem, {
      expanding: rest.expanding,
      children: row,
    });
  }
  return columnContext
    ? jsx(CometColumnItem, {
        expanding: rest.expanding,
        children: row,
      })
    : row;
});

const l = stylex.create({
  4: {
    paddingLeft: '4px',
    paddingRight: '4px',
  },
  8: {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  12: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  16: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
});

const m = stylex.create({
  0: {
    paddingTop: '0',
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
});

const n = stylex.create({
  4: {
    paddingBottom: '4px',
    paddingTop: '4px',
  },
  8: {
    paddingBottom: '8px',
    paddingTop: '8px',
  },
  12: {
    paddingBottom: '12px',
    paddingTop: '12px',
  },
  16: {
    paddingBottom: '16px',
    paddingTop: '16px',
  },
});

const o = stylex.create({
  4: {
    marginLeft: '-2px',
    marginRight: '-2px',
  },
  8: {
    marginLeft: '-4px',
    marginRight: '-4px',
  },
  12: {
    marginLeft: '-6px',
    marginRight: '-6px',
  },
  16: {
    marginLeft: '-8px',
    marginRight: '-8px',
  },
  24: {
    marginLeft: '-12px',
    marginRight: '-12px',
  },
  32: {
    marginLeft: '-16px',
    marginRight: '-16px',
  },
});

const p = stylex.create({
  4: {
    marginBottom: '-2px',
    marginTop: '-2px',
  },
  8: {
    marginBottom: '-4px',
    marginTop: '-4px',
  },
  12: {
    marginBottom: '-6px',
    marginTop: '-6px',
  },
  16: {
    marginBottom: '-8px',
    marginTop: '-8px',
  },
  24: {
    marginBottom: '-12px',
    marginTop: '-12px',
  },
  32: {
    marginBottom: '-16px',
    marginTop: '-16px',
  },
});
