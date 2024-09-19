import { useContext, useLayoutEffect } from 'react';
import { HeroInteractionContext, HeroInteractionIDContext } from '@meta-core/contexts';

// eslint-disable-next-line react/prop-types
export function HeroHoldTrigger({ description, hold }) {
  // var b = a.description,
  //   e = a.hold,
  const interactionValue = useContext(HeroInteractionContext.Context);
  const interactionIDValue = useContext(HeroInteractionIDContext);
  useLayoutEffect(() => {
    if (hold && interactionIDValue) {
      let a = interactionValue.hold(interactionIDValue, interactionValue.pageletStack, description);
      return function () {
        interactionValue.unhold(interactionIDValue, a);
      };
    }
  }, [description, interactionValue, interactionIDValue, hold]);
  return null;
}

HeroHoldTrigger.displayName = 'HeroHoldTrigger';
