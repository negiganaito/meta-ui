import { jsx, jsxs } from 'react/jsx-runtime';
import { XPlatReactSVG } from '@meta-core/image/xplat-react-svg';

export function FBNucleusArrowLeftFilled24(props) {
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
        d: 'M8.866 4.366a1.25 1.25 0 1 1 1.768 1.768c-.791.791-1.553 1.55-2.305 2.3-.777.774-1.544 1.539-2.32 2.316H20.75a1.25 1.25 0 0 1 0 2.5H6.016l2.307 2.306.004.004 2.307 2.306a1.25 1.25 0 1 1-1.768 1.768l-2.302-2.302-.005-.004-3.389-3.389a2.747 2.747 0 0 1-.004-3.88c1.153-1.158 2.27-2.27 3.404-3.402l2.296-2.29z',
      }),
    ],
  });
}

FBNucleusArrowLeftFilled24._isSVG = !0;
