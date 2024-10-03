import { useEffect, useRef } from 'react';
import { useShallowArrayEqualMemo } from '@meta-core/hooks/use-shallow-array-equal-memo';

function containsNode(containerRef, node) {
  return containerRef === null
    ? undefined
    : containerRef.current === null
    ? undefined
    : containerRef.current.contains(node);
}

function someContainerContainsNode(containerRefs, node) {
  return containerRefs.some((ref) => containsNode(ref, node));
}

// eslint-disable-next-line max-params
export function useGeoMouseListeners(onMouseOver, onMouseOut, onMouseMove, containerRefs) {
  const memoizedRefs = useShallowArrayEqualMemo(containerRefs);
  const isMouseInside = useRef(false);

  useEffect(() => {
    if (!memoizedRefs || (!onMouseOver && !onMouseOut)) return;

    const handleMouseOver = (event) => {
      if (!isMouseInside.current && someContainerContainsNode(memoizedRefs, event.target)) {
        isMouseInside.current = true;
        onMouseOver?.(event);
      }
    };

    const handleMouseOut = (event) => {
      if (
        isMouseInside.current &&
        someContainerContainsNode(memoizedRefs, event.target) &&
        !someContainerContainsNode(memoizedRefs, event.relatedTarget)
      ) {
        isMouseInside.current = false;
        onMouseOut?.();
      }
    };

    const handleMouseMove = (event) => {
      if (isMouseInside.current && someContainerContainsNode(memoizedRefs, event.target)) {
        onMouseMove?.();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [memoizedRefs, onMouseOver, onMouseOut, onMouseMove]);
}
