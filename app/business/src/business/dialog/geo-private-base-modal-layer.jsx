import React from 'react';
import { GeoPrivateCloseButtonContext } from '@meta-business/contexts/geo-private-close-button-context';
import { useGeoPrivateLegacyDialogCompatibility } from '@meta-business/hooks/use-geo-private-legacy-dialog-compatibility';
import { useGeoPrivateOnEscape } from '@meta-business/hooks/use-geo-private-on-escape';
import { useResizeObserverLoopLimitSafeCallbackWrapper } from '@meta-business/hooks/use-resize-observer-loop-limit-safe-callback-wrapper';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import { CometVisualCompletionAttributes } from '@meta-core/react-utils/comet-visual-completion-attributes';
import { ContextualThing } from '@meta-core/react-utils/contextual-thing';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';
import { useResizeObserver } from '@meta-core/react-utils/use-resize-observer';
import { useStyleXTransitionSingle } from '@meta-core/react-utils/use-stylex-transition-single';
import { useWindowSize } from '@meta-core/utils/use-window-size';
import stylex from '@stylexjs/stylex';

import { GeoPrivateBaseModalLayerOverlay } from './geo-private-base-modal-layer-overlay';

const gkx24835 = true; // gkx24835;

const styles = stylex.create({
  base: {
    transitionProperty: 'opacity',
    opacity: 0,
  },
  enterBase: {
    opacity: 1,
  },
  fixedToTop: {
    top: '40px',
    position: 'fixed',
  },
  leaveBase: {
    opacity: 0,
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    outlineStyle: 'none',
    pointerEvents: 'all',
    position: 'relative',
    zIndex: 0,
  },
  root: {
    alignItems: 'stretch',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: '100vh',
  },
  defaultPadding: {
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingBottom: '16px',
  },
  fullPagePadding: {
    paddingLeft: '0',
    paddingRight: '0',
    paddingBottom: '0',
  },

  temp: {
    // x1cy8zhl x78zum5 xl56j7k x47corl
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
});

export function GeoPrivateBaseModalLayer({
  anchorUntilHeight = 0,
  children,
  'data-testid': dataTestId,
  dialogTransition,
  hideOnBlur = true,
  hideOnEscape = true,
  isFixedToTop = false,
  isFullPage = false,
  isLoadingState = false,
  isShown = false,
  label,
  labelledBy,
  layerRef,
  onHide,
  width,
  xstyle,
  ignoreVC = true,
}) {
  const layerContainerRef = React.useRef(null);
  const modalContentRef = React.useRef(null);
  const [contentSize, setContentSize] = React.useState(null);
  useGeoPrivateLegacyDialogCompatibility(isShown);

  const isOutsideModalClick = (event) => {
    return (
      layerContainerRef.current &&
      modalContentRef.current &&
      event instanceof Node &&
      !layerContainerRef.current.contains(event) &&
      modalContentRef.current.contains(event)
    );
  };

  const handleLayerCancelClick = (event) => {
    const isCancelClick = event.target instanceof Node && !!ContextualThing.parentByClass(event.target, 'layerCancel');
    if (isCancelClick) onHide('layerCancelButton');
  };

  const isMouseDownOutsideModal = React.useRef(false);
  const handleMouseDown = (event) => {
    isMouseDownOutsideModal.current = isOutsideModalClick(event.target);
  };

  const handleMouseUp = (event) => {
    if (isMouseDownOutsideModal.current && isOutsideModalClick(event.target) && hideOnBlur) {
      onHide('blur');
    }
  };

  const calculatePaddingTop = adjustPaddingForFullPage(contentSize, isFullPage);
  const resizeCallback = React.useCallback((size) => setContentSize(size), []);
  const onResize = React.useCallback(({ height, width }) => setContentSize({ height, width }), []);
  const resizeObserver = useResizeObserver(useResizeObserverLoopLimitSafeCallbackWrapper(onResize));

  const handleEscape = React.useCallback(() => onHide('escape'), [onHide]);
  const escapeRef = useGeoPrivateOnEscape(handleEscape, { contain: true });

  const mergedRefs = useMergeRefs(
    hideOnBlur ? layerContainerRef : null,
    hideOnEscape ? escapeRef : null,
    resizeObserver,
    resizeCallback,
    layerRef,
  );

  const closeButtonContextValue = React.useMemo(() => ({ onHide }), [onHide]);

  const transitionStyles = useModalTransition(isShown);
  const vcAttributes = ignoreVC ? { ...CometVisualCompletionAttributes.IGNORE } : {};

  return transitionStyles
    ? React.createElement(GeoPrivateCloseButtonContext.Provider, {
        value: closeButtonContextValue,
        children: React.createElement(GeoPrivateBaseModalLayerOverlay, {
          style: transitionStyles.style,
          xstyle: transitionStyles.xstyle,
          children: React.createElement('div', {
            className: stylex([styles.root, isFullPage ? styles.fullPagePadding : styles.defaultPadding]),
            onClick: handleLayerCancelClick,
            onMouseDown: handleMouseDown,
            onMouseUp: handleMouseUp,
            ref: modalContentRef,
            style: { paddingTop: calculatePaddingTop },
            ...vcAttributes,
            children: React.createElement('div', {
              className: stylex(styles.temp),
              style: { minHeight: anchorUntilHeight },
              children: React.createElement('div', {
                'aria-busy': isLoadingState || undefined,
                'aria-label': label,
                'aria-labelledby': labelledBy,
                className: stylex(styles.dialog, isFixedToTop && styles.fixedToTop, dialogTransition?.xstyle, xstyle),
                'data-testid': dataTestId,
                ref: mergedRefs,
                role: 'dialog',
                style: {
                  width,
                  ...dialogTransition?.style,
                },
                tabIndex: -1,
                children,
              }),
            }),
          }),
        }),
      })
    : null;
}

function useModalTransition(isShown) {
  const geoTheme = useGeoTheme();
  const { selectTransition } = geoTheme;
  const enterDuration = gkx24835 ? 280 : 250;
  const exitDuration = gkx24835 ? 200 : 250;

  const fadeIn = selectTransition({ duration: 'slow', timing: 'soft' });
  const fadeOut = selectTransition({ duration: 'short', timing: 'fade' });
  const exitTransition = selectTransition({ duration: 'extraShort', timing: 'exit' });

  return useStyleXTransitionSingle(isShown || null, {
    base: [!gkx24835 && fadeIn, styles.base],
    enter: [styles.enterBase, gkx24835 && fadeOut],
    leave: [styles.leaveBase, gkx24835 && exitTransition],
    durationIn: enterDuration,
    durationOut: exitDuration,
  });
}

function adjustPaddingForFullPage(contentSize, isFullPage) {
  const windowSize = useWindowSize();
  if (isFullPage) return 0;

  if (!contentSize) return 16;

  const { height: contentHeight, width: contentWidth } = contentSize;
  const { innerHeight: windowHeight, innerWidth: windowWidth } = windowSize;

  const paddingTop = Math.round(((windowWidth + contentWidth) * (windowHeight - contentHeight)) / (4 * windowWidth));
  return Math.max(paddingTop, 16);
}
