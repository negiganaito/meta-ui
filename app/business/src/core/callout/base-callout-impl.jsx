import React, { useEffect } from 'react';
import { BaseContextualLayerAnchorRootContext } from '@meta-core/contexts/base-contextual-layer-anchor-root-context';
import { LayoutAnimationBoundaryContext } from '@meta-core/contexts/layout-animation-boundary-context';
import { BaseContextualLayer } from '@meta-core/contextual/base-contextual-layer';
import { useCometDisplayTimingTrackerForInteraction } from '@meta-core/hooks/use-comet-display-timing-tracker-for-interaction';

export const BaseCalloutImpl = ({
  anchorRootRefContext,
  animationContext,
  children,
  contextRef,
  contextualLayerProps,
  imperativeRef,
  scrollableAreaContext,
}) => {
  const trackerRef = useCometDisplayTimingTrackerForInteraction('CometCalloutManager');

  useEffect(() => {
    let nodes = scrollableAreaContext
      .map((node) => {
        return node.getDOMNode();
      })
      .filter(Boolean);
    let scrollFunc = function () {
      return !imperativeRef.current ? undefined : imperativeRef.current.reposition();
    };
    if (nodes.length > 0) {
      nodes.forEach((node) => {
        return node.addEventListener('scroll', scrollFunc, {
          passive: true,
        });
      });
      return function () {
        nodes.forEach((node) => {
          return node.removeEventListener('scroll', scrollFunc, {
            passive: true,
          });
        });
      };
    }
  }, [imperativeRef, imperativeRef]);

  return !contextualLayerProps || !contextRef ? null : (
    <LayoutAnimationBoundaryContext.Provider value={animationContext}>
      <BaseContextualLayerAnchorRootContext.Provider value={anchorRootRefContext}>
        {contextualLayerProps && (
          <BaseContextualLayer
            align={contextualLayerProps.align}
            contextRef={contextRef}
            disableAutoAlign={contextualLayerProps.disableAutoAlign}
            disableAutoFlip={contextualLayerProps.disableAutoFlip}
            imperativeRef={imperativeRef}
            position={contextualLayerProps.position}
            ref={trackerRef}
          >
            {children}
          </BaseContextualLayer>
        )}
      </BaseContextualLayerAnchorRootContext.Provider>
    </LayoutAnimationBoundaryContext.Provider>
  );
};
