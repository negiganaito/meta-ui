import { useLayoutEffect, useState } from 'react';
import { CometSSRViewportHints } from '@meta-core/utils/comet-ssr-viewport-hints';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

/**
 * Custom hook to match viewport dimensions.
 * @param {string} dimensionType - The type of dimension (e.g., 'min-width', 'max-width').
 * @param {string} dimension - The dimension to match (e.g., 'width', 'height').
 * @param {number} pixelValue - The pixel value for the breakpoint.
 * @returns {boolean} - Whether the viewport matches the specified dimensions.
 */
export const useMatchViewport = (dimensionType, dimension, pixelValue) => {
  // Initialize state based on SSR hints or matchMedia.
  let [isMatching, setIsMatching] = useState(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      let f = CometSSRViewportHints.getDimension(dimension);
      return f ? CometSSRViewportHints.check[dimensionType](f, pixelValue) : !1;
    }
    return !!window.matchMedia && window.matchMedia(getMediaQuery(dimensionType, dimension, pixelValue)).matches;
  });

  ExecutionEnvironment.canUseDOM ||
    CometSSRViewportHints.addUseMatchViewportResult(dimension, pixelValue, dimensionType, isMatching);

  // Effect to add and clean up matchMedia listener.
  useLayoutEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = getMediaQuery(dimensionType, dimension, pixelValue);
    const mediaQueryList = window.matchMedia(mediaQuery);

    const handleMediaQueryChange = (event) => {
      setIsMatching(event.matches);
    };

    mediaQueryList.addListener(handleMediaQueryChange);
    return () => {
      mediaQueryList.removeListener(handleMediaQueryChange);
    };
  }, [dimensionType, dimension, pixelValue]);

  return isMatching;
};

/**
 * Helper function to create a media query string.
 * @param {string} dimensionType - The type of dimension (e.g., 'min-width', 'max-width').
 * @param {string} dimension - The dimension to match (e.g., 'width', 'height').
 * @param {number} pixelValue - The pixel value for the breakpoint.
 * @returns {string} - The media query string.
 */
function getMediaQuery(dimensionType, dimension, pixelValue) {
  return `(${dimensionType}-${dimension}: ${pixelValue}px)`;
}
