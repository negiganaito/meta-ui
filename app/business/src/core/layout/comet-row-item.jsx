import { forwardRef, useContext } from 'react';
import { jsx } from 'react/jsx-runtime';
import { CometRowContext } from '@meta-core/contexts/comet-row-context';
import { CometErrorBoundary } from '@meta-core/error/comet-error-boundary';
import { CometPlaceholder } from '@meta-core/placeholder/comet-placeholder';
import stylex from '@stylexjs/stylex';

import { BaseRowItem } from './base-row-item';

/**
 * CometRowItem component.
 *
 * This component is a flexible row item that can render placeholders and fallback content if provided.
 * It uses a context to adjust its horizontal and vertical spacing.
 *
 * @param {import("./types").CometRowItemProps} props - The properties for the component.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to be forwarded to the underlying DOM element.
 * @returns {JSX.Element} The rendered component.
 */
const _CometRowItem = (props, ref) => {
  const { fallback, placeholder, ...rest } = props;

  const { spacingHorizontal, spacingVertical } = useContext(CometRowContext) ?? {};

  if (placeholder) {
    rest.placeholder;
    const { placeholder, ..._rest } = props;
    return jsx(CometPlaceholder, {
      fallback: placeholder ? jsx(CometRowItem, { ..._rest, ref, children: placeholder }) : null,
      children: jsx(CometPlaceholder, { ..._rest, ref }),
    });
  }

  if (fallback) {
    rest.fallback;
    const { fallback, ..._rest } = props;
    return !fallback
      ? jsx(CometErrorBoundary, {
          children: jsx(CometPlaceholder, { ..._rest, ref }),
        })
      : jsx(CometErrorBoundary, {
          fallback: function (a, c) {
            return jsx(CometPlaceholder, {
              ..._rest,
              ref,
              children: typeof fallback === 'function' ? fallback(a, c) : fallback,
            });
          },
          children: jsx(CometPlaceholder, { ..._rest, ref }),
        });
  }

  return jsx(BaseRowItem, {
    ...rest,
    ref,
    useDeprecatedStyles: rest.useDeprecatedStyles,
    xstyle: [k[spacingHorizontal], l[spacingVertical], rest.xstyle],
    children: jsx(CometRowContext.Provider, {
      value: null,
      children: rest.children,
    }),
  });
};

export const CometRowItem = forwardRef(_CometRowItem);

const k = stylex.create({
  4: {
    paddingLeft: '2px',
    paddingRight: '2px',
  },
  8: {
    paddingLeft: '4px',
    paddingRight: '4px',
  },
  12: {
    paddingLeft: '6px',
    paddingRight: '6px',
  },
  16: {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  24: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  32: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
});

const l = stylex.create({
  4: {
    paddingBottom: '2px',
    paddingTop: '2px',
  },
  8: {
    paddingBottom: '4px',
    paddingTop: '4px',
  },
  12: {
    paddingBottom: '6px',
    paddingTop: '6px',
  },
  16: {
    paddingBottom: '8px',
    paddingTop: '8px',
  },
  24: {
    paddingBottom: '12px',
    paddingTop: '12px',
  },
  32: {
    paddingBottom: '16px',
    paddingTop: '16px',
  },
});
