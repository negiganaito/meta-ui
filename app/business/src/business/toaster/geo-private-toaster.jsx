import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GeoPrivateToastContext } from '@meta-business/contexts/geo-private-toast-context';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import { useStyleXTransitionSingle } from '@meta-core/react-utils/use-stylex-transition-single';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  itemBase: {
    opacity: 1,
    transform: 'none',
  },
  itemEnterOrLeave: {
    opacity: 0,
    transform: 'translateY(32px)',
  },
});

const TRANSITION_DURATION = 200;
const TOAST_DURATION = 5000;

function ToastItem({ children, config }) {
  const theme = useGeoTheme();
  const transition = theme.selectTransition({
    duration: 'fast',
    timing: 'soft',
  });

  const [transitionState, setTransitionState] = useState('transition');
  const [onLeave, setOnLeave] = useState(null);
  const isVisible = config.isVisible === false;
  const [isActive, setIsActive] = useState(isVisible);
  const hideTimeoutRef = useRef(null);

  useLayoutEffect(() => setIsActive(!isVisible), [isVisible]);

  useEffect(() => {
    if (isActive && config.duration !== 'sticky') {
      hideTimeoutRef.current = window.setTimeout(() => setIsActive(false), TOAST_DURATION);
    } else {
      window.clearTimeout(hideTimeoutRef.current);
    }
    return () => window.clearTimeout(hideTimeoutRef.current);
  }, [isActive, config]);

  const handleLeaveComplete = useCallback(() => {
    if (onLeave) onLeave(transitionState);
    if (config.onAfterHide) config.onAfterHide();
  }, [onLeave, config, transitionState]);

  const handleHide = useCallback((leaveFn) => {
    setOnLeave(() => leaveFn);
    return (fn) => {
      setIsActive(false);
      setTransitionState(fn);
    };
  }, []);

  const transitionStyles = useStyleXTransitionSingle(isActive || null, {
    base: [transition, styles.itemEnterOrLeave],
    enter: styles.itemBase,
    leave: styles.itemEnterOrLeave,
    durationIn: TRANSITION_DURATION,
    durationOut: TRANSITION_DURATION,
    onLeaveComplete: handleLeaveComplete,
  });

  return transitionStyles ? (
    <div className={stylex(transitionStyles.xstyle)} style={transitionStyles.style}>
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <GeoPrivateToastContext.Provider value={{ onHideFactory: handleHide }}>
        {children}
      </GeoPrivateToastContext.Provider>
    </div>
  ) : null;
}

export function GeoPrivateToaster({ 'data-testid': dataTestId, items }) {
  const theme = useGeoTheme();
  const spacing = theme.selectSpacing({
    context: 'container',
    bounds: 'internal',
    relation: 'component',
  });
  const layoutSpacing = theme.selectLayoutSpacing({
    context: 'container',
    direction: 'vertical',
    relation: 'related',
  });

  if (items.length === 0) return null;

  return (
    <div className={stylex(styles.container, spacing, layoutSpacing)} data-testid={dataTestId}>
      {items.map(({ toast, config }) => (
        <ToastItem key={config.key} config={config}>
          {toast}
        </ToastItem>
      ))}
    </div>
  );
}
