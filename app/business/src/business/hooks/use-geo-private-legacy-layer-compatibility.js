import { useEffect, useRef } from 'react';
import { ContextualThing } from '@meta-core/react-utils/contextual-thing';

export function useGeoPrivateLegacyLayerCompatibility(element) {
  const ref = useRef(null);

  useEffect(() => {
    const currentElement = ref.current;
    const targetElement = element instanceof Element ? element : element?.current;

    if (!currentElement || !targetElement) {
      return;
    }

    ContextualThing.register(currentElement, targetElement);
    currentElement.classList.add('uiContextualLayerParent');
  }, [element]);

  return ref;
}
