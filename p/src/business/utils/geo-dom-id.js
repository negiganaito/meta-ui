import { useContext, useMemo } from 'react';

import { GeoSSRSafeIdsContext } from './contexts/geo-ssr-safe-ids-context';
import { useShallowEqualMemo } from './use-shallow-equal-memo';

const attributeMap = new Map([['htmlFor', 'for']]);

function applyAttributes(domAttributes, useRef) {
  const appliedAttributes = {
    ref: null,
  };

  if (useRef) {
    appliedAttributes.ref = (element) => {
      if (!element) return;

      for (const [attribute, values] of domAttributes.entries()) {
        const attributeValue = Array.from(values).join(' ');
        if (!attributeValue) continue;

        const domAttribute = attributeMap.get(attribute) || attribute;
        element.setAttribute(domAttribute, attributeValue);
      }
    };
  } else {
    for (const [attribute, values] of domAttributes.entries()) {
      const attributeValue = Array.from(values).join(' ');
      if (!attributeValue) continue;

      appliedAttributes[attribute] = attributeValue;
    }
  }

  return appliedAttributes;
}

function useApplyGeoDomIDsDirectly(domProps) {
  const ssrSafeIdsContext = useContext(GeoSSRSafeIdsContext);
  const memoizedProps = useShallowEqualMemo(domProps);

  return useMemo(() => {
    const domAttributes = new Map();

    Object.keys(memoizedProps).forEach((key) => {
      const value = memoizedProps[key];
      if (value) {
        domAttributes.set(key, new Set([value]));
      }
    });

    return applyAttributes(domAttributes, ssrSafeIdsContext);
  }, [ssrSafeIdsContext, memoizedProps]);
}

export const GeoDomID = {
  useApplyGeoDomIDsDirectly,
};
