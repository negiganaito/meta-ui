/* eslint-disable no-cond-assign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */

import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { jsx } from 'react/jsx-runtime';
import { BaseContextualLayerAnchorRootContext } from '@meta-core/contexts/base-contextual-layer-anchor-root-context';
import { BaseContextualLayerAvailableHeightContext } from '@meta-core/contexts/base-contextual-layer-available-height-context';
import { BaseContextualLayerContextSizeContext } from '@meta-core/contexts/base-contextual-layer-context-size-context';
import { BaseContextualLayerLayerAdjustmentContext } from '@meta-core/contexts/base-contextual-layer-layer-adjustment-context';
import { BaseContextualLayerOrientationContext } from '@meta-core/contexts/base-contextual-layer-orientation-context';
import { BaseLinkNestedPressableContext } from '@meta-core/contexts/base-link-nested-pressable-context';
import { BaseScrollableAreaContext } from '@meta-core/contexts/base-scrollable-area-context';
import { BaseViewportMarginsContext } from '@meta-core/contexts/base-viewport-margins-context';
import { FDSTextContext } from '@meta-core/contexts/fds-text-context';
import { HiddenSubtreeContext } from '@meta-core/contexts/hidden-subtree-context';
import { LayoutAnimationBoundaryContext } from '@meta-core/contexts/layout-animation-boundary-context';
import { FocusRegion } from '@meta-core/focus/focus-region';
import { focusScopeQueries } from '@meta-core/focus/focus-scope-queries';
import { useLayoutAnimationEvents } from '@meta-core/hooks/use-layout-animation-events';
import { isElementFixedOrSticky } from '@meta-core/react-utils/is-element-fixed-or-sticky';
import { mergeRefs } from '@meta-core/react-utils/merge-refs';
import { useResizeObserver } from '@meta-core/react-utils/use-resize-observer';
import stylex from '@stylexjs/stylex';
import Locale from 'fbjs/lib/Locale';

import { BaseContextualLayerAnchorRoot } from './base-contextual-layer-anchor-root';
import { BaseContextualLayerDefaultContainer } from './base-contextual-layer-default-container';
import { BasePortal } from './base-portal';
import { calculateBaseContextualLayerPosition } from './calculate-base-contextual-layer-position';

const justknobx432 = true;
const gkx7742 = false;
const gkx5608 = false; // ra

const LayoutAnimationEvents = {
  LAYOUT_ANIMATION_EVENT: 'layoutAnimation',
  LayoutAnimationEventType: { Start: 'Start', Stop: 'Stop' },
};

const styles = stylex.create({
  root: {
    left: '0',
    marginRight: '-9999px',
    position: 'absolute',
    top: '0',
  },

  reflowToPosition: {
    marginRight: 0,
    marginLeft: null,
    top: 'auto',
  },
});

// Helper functions
function getElementRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    top: rect.top,
  };
}

function getRemainingScrollDistance() {
  const documentHeight = document.documentElement?.scrollHeight ?? 0;
  const windowHeight = window.innerHeight;
  const scrollableHeight = documentHeight - windowHeight;
  const currentScrollPosition = window.pageYOffset;

  return Math.max(0, scrollableHeight - currentScrollPosition);
}
function getScrollTop(elements) {
  const lastElement = elements[elements.length - 1];
  const domNode = lastElement?.getDOMNode();
  return domNode?.scrollTop ? domNode.scrollTop : window.pageYOffset;
}

function getOffsetRect(element) {
  const style = getComputedStyle(element);
  return style && style.getPropertyValue('position') !== 'static'
    ? element
    : (element instanceof HTMLElement && element.offsetParent) || element.ownerDocument.documentElement;
}

const OFFSET = 8;
const MIN_AVAILABLE_HEIGHT = 40; // fa
const MIN_VIEWPORT_HEIGHT = 145; // ga

function getRectIntersection(rect1, rect2) {
  return rect1.bottom < rect2.top || rect2.bottom < rect1.top || rect1.right < rect2.left || rect2.right < rect1.left
    ? null
    : {
        bottom: Math.min(rect1.bottom, rect2.bottom),
        left: Math.max(rect1.left, rect2.left),
        right: Math.min(rect1.right, rect2.right),
        top: Math.max(rect1.top, rect2.top),
      };
}

const isRTL = Locale.isRTL();

// Reducer and initial state for managing the contextual layer state
function layerReducer(state, action) {
  switch (action.type) {
    case 'determine_direction':
      if (state.position !== action.position || state.availableHeight !== action.availableHeight) {
        return {
          ...state,
          availableHeight: action.availableHeight,
          position: action.position,
        };
      }
      break;
    case 'reposition':
      if (
        state.adjustment !== action.adjustment ||
        state.contextSize?.height !== action.contextSize?.height ||
        state.contextSize?.width !== action.contextSize?.width
      ) {
        return {
          ...state,
          adjustment: action.adjustment,
          contextSize: action.contextSize,
          isPositionIndeterminate: false,
        };
      }
      break;
    case 'position_indeterminate':
      return { ...state, isPositionIndeterminate: true };
    case 'position_changed':
      if (state.position !== action.position) {
        return { ...state, position: action.position };
      }
      break;
    default:
      return state;
  }
  return state;
}

function initialState(position) {
  return {
    adjustment: null,
    availableHeight: null,
    contextSize: null,
    isPositionIndeterminate: false,
    position,
  };
}

// CHANGED
// @Becareful
function _BaseContextualLayer(props, ref) {
  const {
    align = 'start',
    disableAutoAlign = false,
    children,
    containFocus = false,
    customContainer: CustomContainer = BaseContextualLayerDefaultContainer,
    disableAutoFlip = false,
    hidden = false,
    imperativeRef,
    onEscapeFocusRegion,
    onIndeterminatePosition,
    position = 'below',
    presencePayload,
    reflowToPosition = false,
    restoreFocus = true,
    stopClickPropagation = false,
    xstyle,
    ...rest
  } = props;

  const [
    { adjustment: layerAdjustment, availableHeight, contextSize, isPositionIndeterminate, position: currentPosition },
    dispatch,
  ] = useReducer(layerReducer, position, initialState);

  const baseContextualLayerAnchorRoot = useContext(BaseContextualLayerAnchorRootContext); // I
  const scrollableAreas = useContext(BaseScrollableAreaContext);
  const K = reflowToPosition ? true : disableAutoFlip;
  const L = reflowToPosition ? true : disableAutoAlign;
  const viewportMargins = useContext(BaseViewportMarginsContext);
  const layoutAnimationBoundary = useContext(LayoutAnimationBoundaryContext);

  const [isAnimating, setIsAnimating] = useState(false);
  const { hidden: subtreeHidden } = useContext(HiddenSubtreeContext);
  const isHidden = subtreeHidden || hidden;

  const containerRef = useRef(null);
  const contextualLayerRef = useRef(null);

  const getContextualLayerElement = useCallback(() => {
    return !rest.context_DEPRECATED && rest.contextRef ? rest.contextRef.current : rest.context_DEPRECATED;
  }, [rest.contextRef, rest.context_DEPRECATED]);

  const getViewportBounds = useCallback(() => {
    const html = document.documentElement;
    if (!html) {
      return;
    }
    return {
      bottom: html.clientHeight - viewportMargins.bottom - OFFSET,
      left: viewportMargins.left + OFFSET,
      right: html.clientWidth - viewportMargins.right - OFFSET,
      top: viewportMargins.top + OFFSET,
    };
  }, [viewportMargins.bottom, viewportMargins.left, viewportMargins.right, viewportMargins.top]);

  let U = null;
  reflowToPosition && (U = getRemainingScrollDistance());

  // Determine the optimal position of the contextual layer
  // eslint-disable-next-line complexity
  const determinePosition = useCallback(() => {
    const containerElement = containerRef.current;
    let contextElement = getContextualLayerElement(); // b = S()
    let viewportBounds = getViewportBounds(); // d = T()
    if (!containerElement || !contextElement || !viewportBounds) return;

    const containerRect = getElementRect(containerElement);
    const contextRect = getElementRect(contextElement); // e

    const containerHeight = containerRect.bottom - containerRect.top;
    const containerWidth = containerRect.right - containerRect.left;

    let startPosition = isRTL ? 'start' : 'end'; // g
    let endPosition = isRTL ? 'end' : 'start'; // h
    let newPosition = currentPosition;
    let availableHeight = null; // j

    // Determine the new position if auto-flip is enabled
    // !disableAutoFlip
    if (!K) {
      if (currentPosition === 'above' || currentPosition === 'below') {
        if (
          currentPosition === 'above' &&
          contextRect.top - containerHeight < viewportBounds.top &&
          contextRect.bottom + containerHeight < viewportBounds.bottom
        ) {
          newPosition = 'below';
        } else if (currentPosition === 'above' && getScrollTop(scrollableAreas) + contextRect.top < containerHeight) {
          newPosition = 'below';
        } else if (
          currentPosition === 'below' &&
          contextRect.bottom + containerHeight > viewportBounds.bottom &&
          contextRect.top - containerHeight > viewportBounds.top
        ) {
          newPosition = 'above';
        }
      } else if (currentPosition === 'start' || currentPosition === 'end') {
        if (
          currentPosition === endPosition &&
          contextRect.left - containerWidth < viewportBounds.left &&
          contextRect.right + containerWidth < viewportBounds.right
        ) {
          newPosition = startPosition;
        } else if (
          currentPosition === startPosition &&
          contextRect.right + containerWidth > viewportBounds.right &&
          contextRect.left - containerWidth > viewportBounds.left
        ) {
          newPosition = endPosition;
        }
      }
    }

    if (newPosition === 'above' || newPosition === 'below') {
      availableHeight =
        newPosition === 'above' ? contextRect.top - viewportBounds.top : viewportBounds.bottom - contextRect.bottom;
    } else if (newPosition === 'start' || newPosition === 'end') {
      availableHeight =
        Math.max(viewportBounds.bottom, contextRect.bottom) - Math.min(contextRect.top, viewportBounds.top);
    }

    if (reflowToPosition && U !== null) {
      // g = I.current;
      // h = g ? c("isElementFixedOrSticky")(g) : !1;
      // g = !h && b.nodeType === 1 && c("isElementFixedOrSticky")(b);
      // h = ((h = d == null ? void 0 : d.bottom) != null ? h : 0) - ((b = d == null ? void 0 : d.top) != null ? b : 0);
      // b = g ? 0 : U;
      // g = b + h - fa;
      // h = b + d.bottom - e.bottom;
      // j = Math.max(Math.min(g, h), ga)

      // temp, fix later
      startPosition = baseContextualLayerAnchorRoot.current;
      endPosition = startPosition ? isElementFixedOrSticky(startPosition) : !1;
      startPosition = !endPosition && contextElement.nodeType === 1 && isElementFixedOrSticky(contextElement);
      endPosition =
        ((endPosition = viewportBounds === null ? void 0 : viewportBounds.bottom) !== null ? endPosition : 0) -
        ((contextElement = viewportBounds === null ? void 0 : viewportBounds.top) !== null ? contextElement : 0);
      contextElement = startPosition ? 0 : U;
      startPosition = contextElement + endPosition - MIN_AVAILABLE_HEIGHT;
      endPosition = contextElement + viewportBounds.bottom - contextRect.bottom;
      availableHeight = Math.max(Math.min(startPosition, endPosition), MIN_VIEWPORT_HEIGHT);
    }

    contextualLayerRef.current = {
      height: containerHeight,
      width: containerWidth,
    };

    dispatch({
      availableHeight: availableHeight,
      position: newPosition,
      type: 'determine_direction',
    });
  }, [
    getContextualLayerElement, // S
    getViewportBounds, // T
    currentPosition, // G
    K,
    reflowToPosition, // z
    scrollableAreas, // J
    baseContextualLayerAnchorRoot, // I
    U,
  ]);

  let W = null;
  reflowToPosition && (W = availableHeight);

  // Reposition the contextual layer
  // eslint-disable-next-line complexity
  const repositionLayer = useCallback(() => {
    const html = document.documentElement;
    const anchorRootElement = baseContextualLayerAnchorRoot.current;
    const viewportBounds = getViewportBounds(); //
    const contextElement = getContextualLayerElement(); //

    let g = containerRef.current;

    if (!html || !anchorRootElement || !viewportBounds || !contextElement || !g) return;

    const containerRect = getOffsetRect(anchorRootElement); // h

    let i = getOffsetRect(anchorRootElement);

    if (!i) {
      return;
    }

    const isFixedOrSticky =
      isElementFixedOrSticky(anchorRootElement) ||
      (contextElement.nodeType === 1 && isElementFixedOrSticky(contextElement));

    const scrollableRects = scrollableAreas
      .map((area) => area.getDOMNode())
      .filter(Boolean)
      .filter((node) => containerRect.contains(node))
      .reduce(
        (acc, node) => (acc ? getRectIntersection(acc, getElementRect(node)) : null),
        getElementRect(contextElement),
      );

    if (!scrollableRects || (scrollableRects.left === 0 && scrollableRects.right === 0)) {
      dispatch({ type: 'position_indeterminate' });
      if (onIndeterminatePosition) onIndeterminatePosition();
      return;
    }

    const offsetRect = isFixedOrSticky
      ? {
          bottom: html.clientHeight,
          left: 0,
          right: html.clientWidth,
          top: 0,
        }
      : getElementRect(containerRect);

    const { adjustment, style } = calculateBaseContextualLayerPosition({
      align,
      contextRect: scrollableRects, // scrollableRects is e
      contextualLayerSize: L ? null : contextualLayerRef.current,
      fixed: isFixedOrSticky, // isFixedOrSticky is b
      offsetRect, // offsetRect is a
      position: currentPosition,
      screenRect: viewportBounds, // viewportBounds is d
    });

    let l = style;
    let h;

    if (justknobx432) {
      l = { left: null, 'max-height': null, position: null, right: null, top: null, 'z-index': null, ...style };
      let j;
      if (reflowToPosition) {
        j = containerRect.bottom - containerRect.top;
        h = viewportBounds.bottom - scrollableRects.bottom;
        j = j - h;
        h = isFixedOrSticky ? 0 : getRemainingScrollDistance();
        let m = scrollableRects.bottom - offsetRect.top;
        j - h > 0 && (m -= j);
        h = viewportBounds.left - offsetRect.left;
        j = viewportBounds.right - viewportBounds.left;
        l = {
          left: h + 'px',
          'max-height': (W ?? 0) + 'px',
          position: isFixedOrSticky ? 'fixed' : 'absolute',
          top: m + 'px',
          width: j + 'px',
          'z-index': gkx7742 ? '299' : '3',
        };
      }
    }

    // applyStyles(containerRef.current, style);
    if (g) {
      const _style = Object.keys(l);
      for (h = 0; h < _style.length; h++) {
        let a = _style[h];
        let b = l[a];
        b !== null ? g.style.setProperty(a, b) : g.style.removeProperty(a);
      }
    }

    dispatch({
      adjustment,
      contextSize: {
        height: scrollableRects.bottom - scrollableRects.top,
        width: scrollableRects.right - scrollableRects.left,
      },
      type: 'reposition',
    });
  }, [
    baseContextualLayerAnchorRoot,
    getViewportBounds,
    getContextualLayerElement,
    scrollableAreas,
    L,
    align,
    currentPosition,
    onIndeterminatePosition,
    W,
    reflowToPosition,
  ]);

  const handleLayoutAnimationEvent = useCallback(
    (event) => {
      if (event === LayoutAnimationEvents.LayoutAnimationEventType.Start) {
        setIsAnimating(true);
      } else if (event === LayoutAnimationEvents.LayoutAnimationEventType.Stop) {
        setIsAnimating(false);
        repositionLayer();
      }
    },
    [repositionLayer, setIsAnimating],
  );

  useLayoutEffect(() => {
    if (layoutAnimationBoundary && layoutAnimationBoundary.getIsAnimating()) {
      handleLayoutAnimationEvent(LayoutAnimationEvents.LayoutAnimationEventType.Start);
    }
  }, [layoutAnimationBoundary, handleLayoutAnimationEvent]);

  useLayoutAnimationEvents(handleLayoutAnimationEvent);

  useImperativeHandle(
    imperativeRef,
    () => ({
      reposition: (options = {}) => {
        if (!isHidden) {
          const { autoflip = false } = options;
          if (autoflip) determinePosition();
          repositionLayer();
        }
      },
    }),
    [isHidden, repositionLayer, determinePosition],
  );

  const resizeObserver = useResizeObserver(({ height, width }) => {
    contextualLayerRef.current = { height, width };
    repositionLayer();
  });

  const initialPositionRef = useRef(position);

  useLayoutEffect(
    () => {
      if (position !== initialPositionRef.current) {
        dispatch({ position, type: 'position_changed' });
        if (!isHidden) {
          determinePosition();
          repositionLayer();
        }
        initialPositionRef.current = position;
      }
    },
    // , [position, isHidden, determinePosition, repositionLayer]
  );

  const handleContainerRef = useCallback(
    (element) => {
      containerRef.current = element;
      if (element && !isHidden) {
        determinePosition();
        repositionLayer();
      }
    },
    [isHidden, determinePosition, repositionLayer],
  );

  useEffect(() => {
    if (!gkx5608 || isHidden) return;
    let a = getContextualLayerElement();
    let b = new ResizeObserver(() => {
      determinePosition();
      repositionLayer();
    });
    if (!a || !(a instanceof HTMLElement)) return;
    b.observe(a);
    return function () {
      b.disconnect();
    };
  }, [
    getContextualLayerElement,
    determinePosition,
    repositionLayer,
    isHidden,
    // , ra
  ]);

  useEffect(() => {
    if (isHidden) return;
    const onResize = () => {
      determinePosition();
      repositionLayer();
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [isHidden, determinePosition, repositionLayer]);

  useEffect(() => {
    if (isHidden) return;
    const scrollableElements = scrollableAreas.map((area) => area.getDOMNode()).filter(Boolean);
    if (scrollableElements.length > 0) {
      scrollableElements.forEach((element) => {
        element.addEventListener('scroll', repositionLayer, { passive: true });
      });
      return () => {
        scrollableElements.forEach((element) => {
          element.removeEventListener('scroll', repositionLayer, {
            passive: true,
          });
        });
      };
    }
  }, [isHidden, repositionLayer, scrollableAreas]);

  useEffect(() => {
    if (!window.addEventListener || isHidden) {
      return;
    }
    window.addEventListener('scroll', repositionLayer, { passive: true });
    return () => {
      window.removeEventListener('scroll', repositionLayer, { passive: true });
    };
  }, [isHidden, repositionLayer]);

  const combinedRef = useMemo(
    () => mergeRefs(handleContainerRef, resizeObserver, ref),
    [handleContainerRef, resizeObserver, ref],
  );

  const baseContextualLayerOrientation = useMemo(
    () => ({
      align,
      position: currentPosition,
    }),
    [align, currentPosition],
  );

  const shouldHide = hidden || isPositionIndeterminate;

  return jsx(BasePortal, {
    target: baseContextualLayerAnchorRoot.current,
    children: jsx(CustomContainer, {
      hidden: shouldHide || isAnimating,
      presencePayload,
      ref: combinedRef,
      stopClickPropagation,
      xstyle: [styles.root, reflowToPosition && styles.rootReflowToPosition, xstyle],
      children: jsx(FocusRegion.FocusRegion, {
        autoFocusQuery: !shouldHide && containFocus ? focusScopeQueries.headerFirstTabbableSecondScopeQuery : null,
        autoRestoreFocus: !shouldHide && restoreFocus,
        containFocusQuery: !shouldHide && containFocus ? focusScopeQueries.tabbableScopeQuery : null,
        onEscapeFocusRegion: onEscapeFocusRegion,
        recoverFocusQuery: shouldHide ? null : focusScopeQueries.headerFirstTabbableSecondScopeQuery,
        children: jsx(BaseContextualLayerAnchorRoot, {
          children: jsx(BaseContextualLayerContextSizeContext.Provider, {
            value: contextSize,
            children: jsx(BaseContextualLayerLayerAdjustmentContext.Provider, {
              value: layerAdjustment,
              children: jsx(BaseContextualLayerAvailableHeightContext.Provider, {
                value: availableHeight,
                children: jsx(BaseContextualLayerOrientationContext.Provider, {
                  value: baseContextualLayerOrientation,
                  children: jsx(BaseLinkNestedPressableContext.Provider, {
                    value: false,
                    children: jsx(FDSTextContext.FDSTextContextProvider, {
                      color: null,
                      type: null,
                      children,
                    }),
                  }),
                }),
              }),
            }),
          }),
        }),
      }),
    }),
  });
}

export const BaseContextualLayer = forwardRef(_BaseContextualLayer);

BaseContextualLayer.displayName = 'BaseContextualLayer [from BaseContextualLayer.react]';

// Helper function to apply styles to an element
function applyStyles(element, styles) {
  if (element) {
    const styleKeys = Object.keys(styles);
    for (let key of styleKeys) {
      const value = styles[key];
      if (value) {
        element.style.setProperty(key, value);
      } else {
        element.style.removeProperty(key);
      }
    }
  }
}

// __d(
//   'BaseContextualLayer.react',
//   [
//     'BaseContextualLayerAnchorRoot.react',
//     'BaseContextualLayerAnchorRootContext',
//     'BaseContextualLayerAvailableHeightContext',
//     'BaseContextualLayerContextSizeContext',
//     'BaseContextualLayerDefaultContainer.react',
//     'BaseContextualLayerLayerAdjustmentContext',
//     'BaseContextualLayerOrientationContext',
//     'BaseLinkNestedPressableContext',
//     'BasePortal.react',
//     'BaseScrollableAreaContext',
//     'BaseViewportMarginsContext',
//     'FDSTextContext',
//     'FocusRegion.react',
//     'HiddenSubtreeContext',
//     'LayoutAnimationBoundaryContext',
//     'LayoutAnimationEvents',
//     'Locale',
//     'calculateBaseContextualLayerPosition',
//     'focusScopeQueries',
//     'getComputedStyle',
//     'gkx',
//     'isElementFixedOrSticky',
//     'justknobx',
//     'mergeRefs',
//     'react',
//     'useLayoutAnimationEvents',
//     'useResizeObserver',
//   ],
//   function (a, b, c, d, e, f, g) {
//     'use strict';
//     var h,
//       i,
//       j = i || (i = d('react'));
//     b = i;
//     var k = b.useCallback,
//       l = b.useContext,
//       m = b.useEffect,
//       aa = b.useImperativeHandle,
//       n = b.useLayoutEffect,
//       o = b.useMemo,
//       ba = b.useReducer,
//       p = b.useRef,
//       ca = b.useState;
//     function q(a) {
//       a = a.getBoundingClientRect();
//       return {
//         bottom: a.bottom,
//         left: a.left,
//         right: a.right,
//         top: a.top,
//       };
//     }
//     function r() {
//       var a;
//       a = (a = (a = document.documentElement) == null ? void 0 : a.scrollHeight) != null ? a : 0;
//       var b = window.innerHeight;
//       a = a - b;
//       return Math.max(0, a - window.pageYOffset);
//     }
//     function da(a) {
//       return (a = (a = a[a.length - 1]) == null ? void 0 : (a = a.getDOMNode()) == null ? void 0 : a.scrollTop) != null
//         ? a
//         : window.pageYOffset;
//     }
//     function ea(a) {
//       var b = (h || (h = c('getComputedStyle')))(a);
//       return b != null && b.getPropertyValue('position') !== 'static'
//         ? a
//         : (a instanceof HTMLElement && a.offsetParent) || a.ownerDocument.documentElement;
//     }
//     var s = 8,
//       fa = 40,
//       ga = 145;
//     function ha(a, b) {
//       return a.bottom < b.top || b.bottom < a.top || a.right < b.left || b.right < b.left
//         ? null
//         : {
//             bottom: Math.min(a.bottom, b.bottom),
//             left: Math.max(a.left, b.left),
//             right: Math.min(a.right, b.right),
//             top: Math.max(a.top, b.top),
//           };
//     }
//     var t = d('Locale').isRTL(),
//       u = {
//         root: {
//           left: 'xu96u03',
//           start: null,
//           end: null,
//           marginRight: 'xm80bdy',
//           marginStart: null,
//           marginEnd: null,
//           position: 'x10l6tqk',
//           top: 'x13vifvy',
//           $$css: !0,
//         },
//         rootReflowToPosition: {
//           marginRight: 'x1yf7rl7',
//           marginStart: null,
//           marginEnd: null,
//           top: 'x80663w',
//           $$css: !0,
//         },
//       };
//     function ia(a) {
//       return {
//         adjustment: null,
//         availableHeight: null,
//         contextSize: null,
//         isPositionIndeterminate: !1,
//         position: a,
//       };
//     }
//     function ja(a, b) {
//       var c;
//       switch (b.type) {
//         case 'determine_direction':
//           if (a.position !== b.position || a.availableHeight !== b.availableHeight)
//             return babelHelpers['extends']({}, a, {
//               availableHeight: b.availableHeight,
//               position: b.position,
//             });
//           break;
//         case 'reposition':
//           if (
//             a.adjustment !== b.adjustment ||
//             ((c = a.contextSize) == null ? void 0 : c.height) !== ((c = b.contextSize) == null ? void 0 : c.height) ||
//             ((c = a.contextSize) == null ? void 0 : c.width) !== ((c = b.contextSize) == null ? void 0 : c.width)
//           )
//             return babelHelpers['extends']({}, a, {
//               adjustment: b.adjustment,
//               contextSize: b.contextSize,
//               isPositionIndeterminate: !1,
//             });
//           break;
//         case 'position_indeterminate':
//           return babelHelpers['extends']({}, a, {
//             isPositionIndeterminate: !0,
//           });
//         case 'position_changed':
//           if (a.position !== b.position)
//             return babelHelpers['extends']({}, a, {
//               position: b.position,
//             });
//           break;
//       }
//       return a;
//     }
//     e = j.forwardRef(a);
//     function a(a, b) {
//       var e = a.align,
//         f = e === void 0 ? 'start' : e;
//       e = a.disableAutoAlign;
//       e = e === void 0 ? !1 : e;
//       var g = a.children,
//         h = a.containFocus;
//       h = h === void 0 ? !1 : h;
//       var i = a.customContainer;
//       i = i === void 0 ? c('BaseContextualLayerDefaultContainer.react') : i;
//       var v = a.disableAutoFlip;
//       v = v === void 0 ? !1 : v;
//       var w = a.hidden;
//       w = w === void 0 ? !1 : w;
//       var ka = a.imperativeRef,
//         la = a.onEscapeFocusRegion,
//         x = a.onIndeterminatePosition,
//         ma = a.presencePayload,
//         y = a.reflowToPosition,
//         z = y === void 0 ? !1 : y;
//       y = a.position;
//       var A = y === void 0 ? 'below' : y;
//       y = a.restoreFocus;
//       y = y === void 0 ? !0 : y;
//       var B = a.stopClickPropagation;
//       B = B === void 0 ? !1 : B;
//       var na = a.xstyle,
//         C = babelHelpers.objectWithoutPropertiesLoose(a, [
//           'align',
//           'disableAutoAlign',
//           'children',
//           'containFocus',
//           'customContainer',
//           'disableAutoFlip',
//           'hidden',
//           'imperativeRef',
//           'onEscapeFocusRegion',
//           'onIndeterminatePosition',
//           'presencePayload',
//           'reflowToPosition',
//           'position',
//           'restoreFocus',
//           'stopClickPropagation',
//           'xstyle',
//         ]);
//       a = ba(ja, A, ia);
//       var D = a[0],
//         oa = D.adjustment,
//         E = D.availableHeight,
//         pa = D.contextSize,
//         F = D.isPositionIndeterminate,
//         G = D.position,
//         H = a[1],
//         I = l(c('BaseContextualLayerAnchorRootContext')),
//         J = l(c('BaseScrollableAreaContext')),
//         K = z ? !0 : v,
//         L = z ? !0 : e,
//         M = l(c('BaseViewportMarginsContext')),
//         N = l(c('LayoutAnimationBoundaryContext'));
//       D = ca(!1);
//       a = D[0];
//       var O = D[1];
//       v = l(c('HiddenSubtreeContext'));
//       e = v.hidden;
//       var P = e || w,
//         Q = p(null),
//         R = p(null),
//         S = k(
//           function () {
//             return C.context_DEPRECATED == null && C.contextRef != null ? C.contextRef.current : C.context_DEPRECATED;
//           },
//           [C.contextRef, C.context_DEPRECATED],
//         ),
//         T = k(
//           function () {
//             var a = document.documentElement;
//             if (a == null) return;
//             return {
//               bottom: a.clientHeight - M.bottom - s,
//               left: M.left + s,
//               right: a.clientWidth - M.right - s,
//               top: M.top + s,
//             };
//           },
//           [M.bottom, M.left, M.right, M.top],
//         ),
//         U = null;
//       z && (U = r());
//       var V = k(
//           function () {
//             var a = Q.current,
//               b = S(),
//               d = T();
//             if (a == null || b == null || d == null) return;
//             var e = q(b);
//             a = q(a);
//             var f = a.bottom - a.top;
//             a = a.right - a.left;
//             var g = t ? 'start' : 'end',
//               h = t ? 'end' : 'start',
//               i = G,
//               j = null;
//             K ||
//               (G === 'above' || G === 'below'
//                 ? G === 'above' && e.top - f < d.top && e.bottom + f < d.bottom
//                   ? (i = 'below')
//                   : G === 'above' && da(J) + e.top < f
//                   ? (i = 'below')
//                   : G === 'below' && e.bottom + f > d.bottom && e.top - f > d.top && (i = 'above')
//                 : (G === 'start' || G === 'end') &&
//                   (G === h && e.left - a < d.left && e.right + a < d.right
//                     ? (i = g)
//                     : G === g && e.right + a > d.right && e.left - a > d.left && (i = h)));
//             i === 'above' || i === 'below'
//               ? (j = i === 'above' ? e.top - d.top : d.bottom - e.bottom)
//               : (i === 'start' || i === 'end') && (j = Math.max(d.bottom, e.bottom) - Math.min(e.top, d.top));
//             if (z && U !== null) {
//               g = I.current;
//               h = g ? c('isElementFixedOrSticky')(g) : !1;
//               g = !h && b.nodeType === 1 && c('isElementFixedOrSticky')(b);
//               h =
//                 ((h = d == null ? void 0 : d.bottom) != null ? h : 0) -
//                 ((b = d == null ? void 0 : d.top) != null ? b : 0);
//               b = g ? 0 : U;
//               g = b + h - fa;
//               h = b + d.bottom - e.bottom;
//               j = Math.max(Math.min(g, h), ga);
//             }
//             R.current = {
//               height: f,
//               width: a,
//             };
//             H({
//               availableHeight: j,
//               position: i,
//               type: 'determine_direction',
//             });
//           },
//           [S, T, G, K, z, J, I, U],
//         ),
//         W = null;
//       z && (W = E);
//       var X = k(
//           function () {
//             var a = document.documentElement,
//               b = I.current,
//               d = T(),
//               e = S(),
//               g = Q.current;
//             if (a == null || b == null || d == null || e == null || g == null) return;
//             var h = q(g),
//               i = ea(b);
//             if (i == null) return;
//             b = c('isElementFixedOrSticky')(b);
//             b = !b && e.nodeType === 1 && c('isElementFixedOrSticky')(e);
//             e = J.map(function (a) {
//               return a.getDOMNode();
//             })
//               .filter(Boolean)
//               .filter(function (a) {
//                 return i.contains(a);
//               })
//               .reduce(function (a, b) {
//                 return a != null ? ha(a, q(b)) : null;
//               }, q(e));
//             if (e == null || (e.left === 0 && e.right === 0)) {
//               H({
//                 type: 'position_indeterminate',
//               });
//               x && x();
//               return;
//             }
//             a = b
//               ? {
//                   bottom: a.clientHeight,
//                   left: 0,
//                   right: a.clientWidth,
//                   top: 0,
//                 }
//               : q(i);
//             var j = c('calculateBaseContextualLayerPosition')({
//                 align: f,
//                 contextRect: e,
//                 contextualLayerSize: L ? null : R.current,
//                 fixed: b,
//                 offsetRect: a,
//                 position: G,
//                 screenRect: d,
//               }),
//               k = j.adjustment;
//             j = j.style;
//             var l = j;
//             if (c('justknobx')._('432')) {
//               l = babelHelpers['extends'](
//                 {
//                   left: null,
//                   'max-height': null,
//                   position: null,
//                   right: null,
//                   top: null,
//                   'z-index': null,
//                 },
//                 j,
//               );
//               if (z === !0) {
//                 j = h.bottom - h.top;
//                 h = d.bottom - e.bottom;
//                 j = j - h;
//                 h = b ? 0 : r();
//                 var m = e.bottom - a.top;
//                 j - h > 0 && (m -= j);
//                 h = d.left - a.left;
//                 j = d.right - d.left;
//                 l = {
//                   left: h + 'px',
//                   'max-height': ((a = W) != null ? a : 0) + 'px',
//                   position: b ? 'fixed' : 'absolute',
//                   top: m + 'px',
//                   width: j + 'px',
//                   'z-index': c('gkx')('7742') ? '299' : '3',
//                 };
//               }
//             }
//             if (g != null) {
//               d = Object.keys(l);
//               for (h = 0; h < d.length; h++) {
//                 a = d[h];
//                 b = l[a];
//                 b != null ? g.style.setProperty(a, b) : g.style.removeProperty(a);
//               }
//             }
//             H({
//               adjustment: k,
//               contextSize: {
//                 height: e.bottom - e.top,
//                 width: e.right - e.left,
//               },
//               type: 'reposition',
//             });
//           },
//           [I, T, S, J, L, f, G, x, W, z],
//         ),
//         Y = k(
//           function (a) {
//             a === d('LayoutAnimationEvents').LayoutAnimationEventType.Start && O(!0),
//               a === d('LayoutAnimationEvents').LayoutAnimationEventType.Stop && (O(!1), X());
//           },
//           [X, O],
//         );
//       n(
//         function () {
//           N != null && N.getIsAnimating() && Y(d('LayoutAnimationEvents').LayoutAnimationEventType.Start);
//         },
//         [N, Y],
//       );
//       c('useLayoutAnimationEvents')(Y);
//       aa(
//         ka,
//         function () {
//           return {
//             reposition: function (a) {
//               if (!P) {
//                 a = a || {};
//                 a = a.autoflip;
//                 a = a === void 0 ? !1 : a;
//                 a && V();
//                 X();
//               }
//             },
//           };
//         },
//         [P, X, V],
//       );
//       var Z = c('useResizeObserver')(function (a) {
//           var b = a.height;
//           a = a.width;
//           R.current = {
//             height: b,
//             width: a,
//           };
//           X();
//         }),
//         $ = p(A);
//       n(function () {
//         A !== $.current &&
//           (H({
//             position: A,
//             type: 'position_changed',
//           }),
//           P || (V(), X()),
//           ($.current = A));
//       });
//       var qa = k(
//           function (a) {
//             (Q.current = a), a != null && !P && (V(), X());
//           },
//           [P, X, V],
//         ),
//         ra = c('gkx')('5608');
//       m(
//         function () {
//           if (!ra || P) return;
//           var a = S(),
//             b = new ResizeObserver(function () {
//               V(), X();
//             });
//           if (a == null || !(a instanceof HTMLElement)) return;
//           b.observe(a);
//           return function () {
//             b.disconnect();
//           };
//         },
//         [S, V, X, P, ra],
//       );
//       m(
//         function () {
//           if (P) return;
//           var a = function () {
//             V(), X();
//           };
//           window.addEventListener('resize', a);
//           return function () {
//             window.removeEventListener('resize', a);
//           };
//         },
//         [P, X, V],
//       );
//       m(
//         function () {
//           if (P) return;
//           var a = J.map(function (a) {
//             return a.getDOMNode();
//           }).filter(Boolean);
//           if (a.length > 0) {
//             a.forEach(function (a) {
//               return a.addEventListener('scroll', X, {
//                 passive: !0,
//               });
//             });
//             return function () {
//               a.forEach(function (a) {
//                 return a.removeEventListener('scroll', X, {
//                   passive: !0,
//                 });
//               });
//             };
//           }
//         },
//         [P, X, J],
//       );
//       m(
//         function () {
//           if (window.addEventListener == null || P) return;
//           window.addEventListener('scroll', X, {
//             passive: !0,
//           });
//           return function () {
//             window.removeEventListener('scroll', X, {
//               passive: !0,
//             });
//           };
//         },
//         [P, X],
//       );
//       D = o(
//         function () {
//           return c('mergeRefs')(qa, Z, b);
//         },
//         [qa, Z, b],
//       );
//       v = o(
//         function () {
//           return {
//             align: f,
//             position: G,
//           };
//         },
//         [f, G],
//       );
//       e = w || F;
//       return j.jsx(c('BasePortal.react'), {
//         target: I.current,
//         children: j.jsx(i, {
//           hidden: w || F || a,
//           presencePayload: ma,
//           ref: D,
//           stopClickPropagation: B,
//           testid: void 0,
//           xstyle: [u.root, z === !0 ? u.rootReflowToPosition : null, na],
//           children: j.jsx(d('FocusRegion.react').FocusRegion, {
//             autoFocusQuery: !e && h ? d('focusScopeQueries').headerFirstTabbableSecondScopeQuery : null,
//             autoRestoreFocus: !e && y,
//             containFocusQuery: !e && h ? d('focusScopeQueries').tabbableScopeQuery : null,
//             onEscapeFocusRegion: la,
//             recoverFocusQuery: e ? null : d('focusScopeQueries').headerFirstTabbableSecondScopeQuery,
//             children: j.jsx(c('BaseContextualLayerAnchorRoot.react'), {
//               children: j.jsx(c('BaseContextualLayerContextSizeContext').Provider, {
//                 value: pa,
//                 children: j.jsx(c('BaseContextualLayerLayerAdjustmentContext').Provider, {
//                   value: oa,
//                   children: j.jsx(c('BaseContextualLayerAvailableHeightContext').Provider, {
//                     value: E,
//                     children: j.jsx(c('BaseContextualLayerOrientationContext').Provider, {
//                       value: v,
//                       children: j.jsx(c('BaseLinkNestedPressableContext').Provider, {
//                         value: !1,
//                         children: j.jsx(d('FDSTextContext').FDSTextContextProvider, {
//                           color: null,
//                           type: null,
//                           children: g,
//                         }),
//                       }),
//                     }),
//                   }),
//                 }),
//               }),
//             }),
//           }),
//         }),
//       });
//     }
//     a.displayName = a.name + ' [from ' + f.id + ']';
//     b = e;
//     g['default'] = b;
//   },
//   98,
// );
