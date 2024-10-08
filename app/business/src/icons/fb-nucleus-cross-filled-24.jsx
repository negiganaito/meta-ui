import { jsx, jsxs } from 'react/jsx-runtime';
import { XPlatReactSVG } from '@meta-core/image/xplat-react-svg';

export function FBNucleusCrossFilled24(props) {
  return jsxs(XPlatReactSVG.Svg, {
    viewBox: '0 0 24 24',
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    title: props.title,
    ...props,
    children: [
      props.children &&
        jsx(XPlatReactSVG.Defs, {
          children: props.children,
        }),
      jsx(XPlatReactSVG.Path, {
        d: 'M19.884 5.884a1.25 1.25 0 0 0-1.768-1.768L12 10.232 5.884 4.116a1.25 1.25 0 1 0-1.768 1.768L10.232 12l-6.116 6.116a1.25 1.25 0 0 0 1.768 1.768L12 13.768l6.116 6.116a1.25 1.25 0 0 0 1.768-1.768L13.768 12l6.116-6.116z',
      }),
    ],
  });
}

FBNucleusCrossFilled24._isSVG = !0;
