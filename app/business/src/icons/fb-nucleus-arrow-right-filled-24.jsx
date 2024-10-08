import { jsx, jsxs } from 'react/jsx-runtime';
import { XPlatReactSVG } from '@meta-core/image/xplat-react-svg';

export function FBNucleusArrowRightFilled24(props) {
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
        d: 'M15.134 4.366a1.25 1.25 0 0 0-1.768 1.768l2.304 2.3h.002l2.32 2.316H3.25a1.25 1.25 0 1 0 0 2.5h14.734l-2.306 2.305-.004.004-2.308 2.307a1.25 1.25 0 0 0 1.768 1.768l2.298-2.297.009-.009 3.389-3.389a2.747 2.747 0 0 0 .004-3.88c-1.153-1.158-2.269-2.27-3.404-3.401l-.001-.002c-.751-.749-1.51-1.505-2.295-2.29z',
      }),
    ],
  });
}

FBNucleusArrowRightFilled24._isSVG = !0;
