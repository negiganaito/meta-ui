import { useContext, useRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { GeoPrivateGlimmerNestingContext } from '@meta-business/contexts/geo-private-glimmer-nesting-context';
import { LoadingMarker } from '@meta-business/layout/loading-marker';
import { CometVisualCompletionAttributes } from '@meta-core/react-utils/comet-visual-completion-attributes';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';
import stylex from '@stylexjs/stylex';

export const GeoBaseLoadingState = ({ children, containerRef, 'data-testid': dt, style, xstyle }) => {
  let f = useContext(GeoPrivateGlimmerNestingContext) === !0;
  let g = useRef(null);

  const d = useMergeRefs(containerRef, g);

  return f === !0
    ? jsx('div', {
        className: stylex(xstyle),
        'data-testid': void 0,
        ref: d,
        style: style,
        children: children,
      })
    : jsx(LoadingMarker, {
        nodeRef: g,
        children: jsx('div', {
          ...CometVisualCompletionAttributes.LOADING_STATE,
          'aria-busy': !0,
          'aria-valuemax': 100,
          'aria-valuemin': 0,
          'aria-valuetext': 'Loading...',
          className: stylex(xstyle),
          'data-testid': void 0,
          ref: d,
          role: 'progressbar',
          style,
          children: jsx(GeoPrivateGlimmerNestingContext.Provider, {
            value: !0,
            children,
          }),
        }),
      });
};
