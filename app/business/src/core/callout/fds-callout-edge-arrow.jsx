import { jsx, jsxs } from 'react/jsx-runtime';
import stylex from '@stylexjs/stylex';

export const FDSCalloutEdgeArrow = ({ children, xstyle, ...rest }) => {
  return jsxs('svg', {
    'aria-hidden': !0,
    className: stylex(xstyle),
    height: '12px',
    viewBox: '0 0 21 12',
    width: '21px',
    ...rest,
    children: [
      rest.title &&
        jsx('title', {
          children: rest.title,
        }),
      children &&
        jsx('defs', {
          children,
        }),
      jsx('path', {
        d: 'M20.685.12c-2.229.424-4.278 1.914-6.181 3.403L5.4 10.94c-2.026 2.291-5.434.62-5.4-2.648V.12h20.684z',
      }),
    ],
  });
};

FDSCalloutEdgeArrow._isSVG = true;
