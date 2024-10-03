import { jsx } from 'react/jsx-runtime';
import stylex from '@stylexjs/stylex';

import { WebIconUtils } from './web-icon-utils';

const styles = stylex.create({
  cssMask: {
    backgroundColor: 'currentColor',
  },
});

export const WebCSSTintedIcon = ({ children, containerRef, fallback, icon, xstyle }) => {
  let src = WebIconUtils.getSrcFromIcon(icon);
  let size = WebIconUtils.getSizeFromIcon(icon);
  let position = WebIconUtils.getPositionFromIcon(icon);

  return !src
    ? fallback
    : jsx('div', {
        className: stylex(styles.cssMask, xstyle),
        ref: containerRef,
        style: {
          width: icon.size,
          height: icon.size,
          WebkitMaskImage: src ? 'url(' + src + ')' : void 0,
          WebkitMaskSize: size && size.width + 'px ' + size.height + 'px',
          WebkitMaskPosition: position && position.x + 'px ' + position.y + 'px',
        },
        children,
      });
};
