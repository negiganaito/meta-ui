import { useState } from 'react';
import { jsx } from 'react/jsx-runtime';
import { CometVisualCompletionAttributes } from '@meta-core/react-utils/comet-visual-completion-attributes';
import { XPlatReactEnvironment } from '@meta-core/react-utils/xplat-react-environment';
import stylex from '@stylexjs/stylex';

import { CometPressableOverlayContainer } from './comet-pressable-overlay-container';

const styles = stylex.create({
  circle: {
    borderRadius: '50%',
  },
  defaultHoveredStyle: {
    backgroundColor: 'var(--hover-overlay)',
  },
  defaultPressedStyle: {
    backgroundColor: 'var(--press-overlay)',
  },
  overlay: {
    borderRadius: 'inherit',
    bottom: '0',
    right: '0',
    opacity: '0',
    pointerEvents: 'none',
    position: 'absolute',
    left: '0',
    top: '0',
    transitionDuration: 'var(--fds-duration-extra-extra-short-out)',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'var(--fds-animation-fade-out)',
  },
  overlayVisible: {
    opacity: '1',
    transitionDuration: '0s',
  },
  // 13/05/2024
  overlayWeb: {
    borderRadius: 'inherit',
  },
  focusRingInset: {
    boxShadow: 'var(--focus-ring-shadow-inset)',
  },
  focusRing: {
    boxShadow: 'var(--focus-ring-shadow-default)',
    outline: 'var(--focus-ring-outline-forced-colors) none',
  },
});

// eslint-disable-next-line complexity
export const CometPressableOverlay = (props) => {
  const {
    focusRingPosition = 'default',
    focusVisible = false,
    focusVisibleStyle,
    hovered = false,
    hoveredStyle = styles.defaultHoveredStyle,
    offset,
    pressed = false,
    pressedStyle = styles.defaultPressedStyle,
    radius,
    showFocusRing = false,
    showGridSignifiers = false,
    xstyle,
  } = props;

  const [state, setState] = useState();

  if (pressed) {
    state !== 'pressed' && setState('pressed');
  } else {
    if (focusVisible) {
      state !== 'focused' && setState('focused');
    } else {
      hovered && state !== 'hovered' && setState('hovered');
    }
  }

  // pressed
  //   ? state !== 'pressed' && setState('pressed')
  //   : focusVisible
  //   ? state !== 'focused' && setState('focused')
  //   : hovered && state !== 'hovered' && setState('hovered');

  let bottom = 0;
  let left = 0;
  let right = 0;
  let top = 0;

  if (offset) {
    if (typeof offset === 'number') {
      bottom = -offset;
      left = -offset;
      right = -offset;
      top = -offset;
    } else {
      bottom = -offset.bottom;
      left = -offset.left;
      right = -offset.right;
      top = -offset.top;
    }
  }

  return jsx(CometPressableOverlayContainer, {
    style: state
      ? {
          ...(typeof radius === 'number' ? { borderRadius: radius } : {}),
          bottom,
          left,
          right,
          top,
        }
      : undefined,
    xstyle: [
      styles.overlay,
      XPlatReactEnvironment.isWeb() && styles.overlayWeb,
      xstyle,
      (pressed || focusVisible || hovered || showGridSignifiers) && styles.overlayVisible,
      state === 'pressed' && pressedStyle,
      state === 'focus' && focusVisibleStyle,
      state === 'hovered' && hoveredStyle,
      state === 'focused' && showFocusRing
        ? focusRingPosition === 'default'
          ? styles.focusRing
          : styles.focusRingInset
        : undefined,
      radius === '50%' && styles.circle,
    ],
    ...CometVisualCompletionAttributes.IGNORE,
    role: 'none',
    children: null,
  });
};
