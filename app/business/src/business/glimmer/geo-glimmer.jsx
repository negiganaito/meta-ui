import { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { jsx } from 'react/jsx-runtime';
import { GeoGlimmerDelayedRenderContext } from '@meta-business/contexts/geo-glimmer-delayed-render-context';
import { GeoGlimmerGroupContext } from '@meta-business/contexts/geo-glimmer-group-context';
import { GeoGlimmerStaggeringContext } from '@meta-business/contexts/geo-glimmer-staggering-context';
import { GeoPrivateGlimmerAnimationStartTimeContext } from '@meta-business/contexts/geo-private-glimmer-animation-start-time-context';
import { GeoPrivateLargeAreaGlimmerContext } from '@meta-business/contexts/geo-private-large-area-glimmer-context';
import { useGeoTheme } from '@meta-business/theme/use-geo-theme';
import { useBoolean } from '@meta-core/hooks/use-boolean';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';
import stylex from '@stylexjs/stylex';

import { GeoBaseLoadingState } from './geo-base-loading-state';

const DEFAULT_DELAY = 100;
const STAGGER_DELAY = 100;
const GLIMMER_DURATION = 1.7;
const DEFAULT_ANIMATION_DURATION = 1000;
const GROUP_ANIMATION_DURATION = 1400;

export function GeoGlimmer({
  containerRef,
  'data-testid': dataTestId,
  height = '100%',
  index = 0,
  shape = 'rectangle',
  variant = 'default',
  width = '100%',
  xstyle,
}) {
  const delayedRenderContext = useContext(GeoGlimmerDelayedRenderContext);
  const isVisible = useDelayedVisibility(false, delayedRenderContext ? DEFAULT_DELAY : 0);

  const glimmerStyle = useGlimmerStyle({ isVisible, shape, variant });
  const glimmerGroupContext = useContext(GeoGlimmerGroupContext);
  const isGlimmerGroup = glimmerGroupContext.isGlimmerGroup;

  const glimmerStaggeringContext = useContext(GeoGlimmerStaggeringContext);
  const { style, glimmerRef } = useStaggeringAnimation(glimmerStaggeringContext, index);

  const containerWidth = isVisible || !isGlimmerGroup ? width : undefined;
  const mergedRefs = useMergeRefs(containerRef, glimmerRef);

  return jsx(GeoBaseLoadingState, {
    containerRef: mergedRefs,
    'data-testid': undefined,
    style: {
      width: containerWidth,
      height,
      ...style,
    },
    xstyle: [glimmerStyle, xstyle],
  });
}

function useStaggeringAnimation(context, index) {
  const [top, setTop] = useState(null);
  const [animationOffset, setAnimationOffset] = useState(0);
  const { value: isInitialized, setTrue: setInitialized } = useBoolean(false);
  const { animationStartTime, setAnimationStartTime } = useContext(GeoPrivateGlimmerAnimationStartTimeContext);

  const duration = context ? GROUP_ANIMATION_DURATION : DEFAULT_ANIMATION_DURATION;
  const totalDuration = duration * 2;

  useLayoutEffect(() => {
    if (!isInitialized) {
      if (!animationStartTime) {
        setAnimationStartTime(Date.now());
      } else {
        setAnimationOffset((Date.now() - animationStartTime) % totalDuration);
      }
      setInitialized();
    }
  }, [animationStartTime, setInitialized, isInitialized, totalDuration, setAnimationStartTime]);

  let delay = 0;
  if (context) {
    if (top) {
      delay = (GLIMMER_DURATION * top) % totalDuration;
    }
  } else {
    delay = index * STAGGER_DELAY;
  }

  const glimmerRef = useMemo(() => {
    return (node) => {
      if (!top && node) {
        setTop(node.getBoundingClientRect().top);
      }
    };
  }, [setTop, top]);

  const adjustedAnimationOffset = (totalDuration + animationOffset - delay) % totalDuration;

  return {
    style: {
      animationDelay: `-${adjustedAnimationOffset}ms`,
      animationDuration: `${duration}ms`,
      animationTimingFunction: context ? 'ease-in' : 'ease',
    },
    glimmerRef,
  };
}

function useDelayedVisibility(initialVisibility, delay) {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(!initialVisibility), delay);
    return () => window.clearTimeout(timer);
  }, [initialVisibility, delay]);

  return isVisible;
}

function useGlimmerStyle({ isVisible, shape, variant }) {
  const geoTheme = useGeoTheme();
  const selectGlimmer = geoTheme.selectGlimmer;
  const selectBorderRadius = geoTheme.selectBorderRadius;
  const isLargeArea = useContext(GeoPrivateLargeAreaGlimmerContext) === true;

  return [
    styles.root,
    isVisible && selectGlimmer({ variant, isLargeArea }),
    !isVisible && styles.waiting,
    selectBorderRadius({ context: shape === 'rectangle' ? 'addon' : 'rounded' }),
  ];
}

const styles = stylex.create({
  root: {
    animationDirection: 'alternate',
    animationFillMode: 'none',
    animationIterationCount: 'infinite',
  },
  waiting: {
    opacity: 0,
  },
});
