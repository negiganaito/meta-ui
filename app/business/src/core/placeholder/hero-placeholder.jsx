import React, { Suspense, useCallback, useContext, useLayoutEffect, useRef } from 'react';
import { HeroInteractionContext } from '@meta-core/contexts/hero-interaction-context';
import { HeroInteractionIDContext } from '@meta-core/contexts/hero-interaction-id-context';
import { useStable } from '@meta-core/hooks/use-stable';

import { HeroFallbackTracker } from './hero-fallback-tracker';
import { HeroPlaceholderUtils } from './hero-placeholder-utils';

function PerformLayoutEffectOnce({ cb }) {
  const hasBeenCalled = useRef(false);

  useLayoutEffect(() => {
    if (!hasBeenCalled.current) {
      cb();
      hasBeenCalled.current = true;
    }
  });

  return null;
}

export const HeroPlaceholder = (props) => {
  const { children, fallback, name, unstable_avoidThisFallback, unstable_onSuspense } = props;

  const heroInteractionContextValue = useContext(HeroInteractionContext);
  const heroInteractionIDContextValue = useContext(HeroInteractionIDContext);

  const simpleUUID1 = useStable(HeroPlaceholderUtils.getSimpleUUID);
  const simpleUUID2 = useStable(HeroPlaceholderUtils.getSimpleUUID);

  const ref = useRef(false);

  const childrenClone = children;

  const suspenseCallback = useCallback(
    (cbProps) => {
      if (heroInteractionIDContextValue) {
        heroInteractionContextValue.suspenseCallback(
          heroInteractionIDContextValue,
          simpleUUID1,
          heroInteractionContextValue.pageletStack,
          cbProps,
          name ? name : 'Unnamed Suspense',
        );
      }

      if (unstable_onSuspense) {
        const thenableDescription = HeroPlaceholderUtils.createThenableDescription(cbProps);

        unstable_onSuspense(thenableDescription ? thenableDescription : '');
      }
    },
    [heroInteractionContextValue, heroInteractionIDContextValue, name, simpleUUID1, unstable_onSuspense],
  );

  useLayoutEffect(() => {
    if (ref.current === false && heroInteractionIDContextValue && heroInteractionIDContextValue) {
      heroInteractionContextValue.hold(
        heroInteractionIDContextValue,
        heroInteractionContextValue.pageletStack,
        'Hydration',
        simpleUUID2,
        name,
      );

      return () => {
        return heroInteractionContextValue.unhold(heroInteractionIDContextValue, simpleUUID2);
      };
    }
  }, [heroInteractionContextValue, heroInteractionIDContextValue, name, simpleUUID2]);

  const onHydrationComplete = function () {
    ref.current = true;

    if (heroInteractionIDContextValue) {
      heroInteractionContextValue.unhold(heroInteractionIDContextValue, simpleUUID2);
    }
  };

  return (
    <Suspense
      fallback={
        <>
          {fallback}
          <PerformLayoutEffectOnce cb={onHydrationComplete} />
          <HeroFallbackTracker uuid={simpleUUID1} />
        </>
      }
      suspenseCallback={suspenseCallback}
      unstable_avoidThisFallback={unstable_avoidThisFallback}
    >
      <PerformLayoutEffectOnce cb={onHydrationComplete} />
      {childrenClone}
    </Suspense>
  );
};

HeroPlaceholder.displayName = 'HeroPlaceholder';
