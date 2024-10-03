/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

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
    presencePayload,
    position = 'below',
    restoreFocus = true,
    stopClickPropagation = false,
    xstyle,
    ...rest
  } = props;

  if (props['data-id'] === 'CometDetailsInputFields') {
    console.log('1');
  }

  const [
    { adjustment: layerAdjustment, availableHeight, contextSize, isPositionIndeterminate, position: currentPosition },
    dispatch,
  ] = useReducer(layerReducer, position, initialState);

  const baseContextualLayerAnchorRoot = useContext(BaseContextualLayerAnchorRootContext);
  const scrollableAreas = useContext(BaseScrollableAreaContext);
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
    if (!html) return;
    return {
      bottom: html.clientHeight - viewportMargins.bottom - OFFSET,
      left: viewportMargins.left + OFFSET,
      right: html.clientWidth - viewportMargins.right - OFFSET,
      top: viewportMargins.top + OFFSET,
    };
  }, [viewportMargins]);

  // Determine the optimal position of the contextual layer
  // eslint-disable-next-line complexity
  const determinePosition = useCallback(() => {
    const containerElement = containerRef.current;
    const contextElement = getContextualLayerElement();
    const viewportBounds = getViewportBounds();
    if (!containerElement || !contextElement || !viewportBounds) return;

    const containerRect = getElementRect(containerElement);
    const contextRect = getElementRect(contextElement);

    const containerHeight = containerRect.bottom - containerRect.top;
    const containerWidth = containerRect.right - containerRect.left;

    const startPosition = isRTL ? 'start' : 'end';
    const endPosition = isRTL ? 'end' : 'start';
    let newPosition = currentPosition;
    let availableHeight = null;

    // Determine the new position if auto-flip is enabled
    if (!disableAutoFlip) {
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

    contextualLayerRef.current = {
      height: containerHeight,
      width: containerWidth,
    };

    dispatch({
      availableHeight: availableHeight,
      position: newPosition,
      type: 'determine_direction',
    });
  }, [getContextualLayerElement, getViewportBounds, disableAutoFlip, currentPosition, scrollableAreas]);

  // Reposition the contextual layer
  const repositionLayer = useCallback(() => {
    const html = document.documentElement;
    const anchorRootElement = baseContextualLayerAnchorRoot.current;
    const viewportBounds = getViewportBounds();
    const contextElement = getContextualLayerElement();
    if (!html || !anchorRootElement || !viewportBounds || !contextElement) return;

    const containerRect = getOffsetRect(anchorRootElement);
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
      contextRect: scrollableRects,
      contextualLayerSize: disableAutoAlign ? null : contextualLayerRef.current,
      fixed: isFixedOrSticky,
      offsetRect,
      position: currentPosition,
      screenRect: viewportBounds,
    });

    applyStyles(containerRef.current, style);
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
    disableAutoAlign,
    align,
    currentPosition,
    onIndeterminatePosition,
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
    [repositionLayer],
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

  useLayoutEffect(() => {
    if (position !== initialPositionRef.current) {
      dispatch({ position, type: 'position_changed' });
      if (!isHidden) {
        determinePosition();
        repositionLayer();
      }
      initialPositionRef.current = position;
    }
  }, [position, isHidden, determinePosition, repositionLayer]);

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
      xstyle: [styles.root, xstyle],
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
                    children: jsx(FDSTextContext.Provider, {
                      value: null,
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
