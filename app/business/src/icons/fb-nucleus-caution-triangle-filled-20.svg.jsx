import { jsx, jsxs } from 'react/jsx-runtime';
import { XPlatReactSVG } from '@meta-core/image/xplat-react-svg';

export function FBNucleusCautionTriangleFilled20Svg(a) {
  return jsxs(XPlatReactSVG.Svg, {
    viewBox: '0 0 20 20',
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    title: a.title,
    ...a,
    children: [
      a.children &&
        jsx(XPlatReactSVG.Defs, {
          children: a.children,
        }),
      jsx(XPlatReactSVG.Path, {
        d: 'M7.189 2.606c1.252-2.16 4.371-2.16 5.624 0l6.093 10.514c1.256 2.167-.308 4.88-2.812 4.88H3.907c-2.504 0-4.067-2.713-2.812-4.88L7.19 2.606zM10.75 7.75a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-3zM9.999 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
      }),
    ],
  });
}
