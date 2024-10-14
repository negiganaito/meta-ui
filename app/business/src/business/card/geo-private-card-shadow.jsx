import { jsx } from 'react/jsx-runtime';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    height: '50px',
    pointerEvents: 'none',
    position: 'absolute',
    transitionProperty: 'opacity',
    transitionDuration: '.2s',
    transitionTimingFunction: 'ease',
    width: '100%',
    opacity: '0',
  },
  visible: {
    opacity: 1,
  },
  top: {
    boxShadow:
      'inset 0 5px 5px -5px rgba(0, 0, 0, .1), inset 0 1px 1px -1px rgba(0, 0, 0, .1), inset 0 -1px 0 -1px rgba(0, 0, 0, .1), inset 0 -5px 0 -5px rgba(0, 0, 0, .1)',
    top: 0,
  },
  bottom: {
    boxShadow:
      'inset 0 5px 0 -5px rgba(0, 0, 0, .1), inset 0 1px 0 -1px rgba(0, 0, 0, .1), inset 0 -1px 1px -1px rgba(0, 0, 0, .1), inset 0 -5px 5px -5px rgba(0, 0, 0, .1)',
    bottom: 0,
  },
});

export const GeoPrivateCardShadow = ({ isVisible, position }) => {
  return jsx('div', {
    className: stylex(
      styles.root,
      position === 'top' && styles.top,
      position === 'bottom' && styles.bottom,
      isVisible && styles.visible,
    ),
  });
};
