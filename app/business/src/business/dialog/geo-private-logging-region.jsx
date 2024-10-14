import { useContext, useMemo } from 'react';
import { jsx } from 'react/jsx-runtime';
import { GeoPrivateLoggingRegionContext } from '@meta-business/contexts/geo-private-logging-region-context';
import { GeoPrivateLoggingRegionHierarchyContext } from '@meta-business/contexts/geo-private-logging-region-hierarchy-context';
import { useRefEffect } from '@meta-core/hooks/use-ref-effect';
import { useMergeRefs } from '@meta-core/react-utils/use-merge-refs';

export const GeoPrivateLoggingRegion = ({ children, inputRef, isDependentRegion = false, name }) => {
  const { renderer, setupElement } = useContext(GeoPrivateLoggingRegionContext);

  const l = useContext(GeoPrivateLoggingRegionHierarchyContext);

  const e = useMemo(() => {
    return l.concat(name);
  }, [l, name]);

  let m = useRefEffect(
    (a) => {
      return !setupElement ? void 0 : setupElement(a, name, isDependentRegion);
    },
    [isDependentRegion, name, setupElement],
  );

  const d = useMergeRefs(inputRef, m);
  m = children(d);

  return jsx(GeoPrivateLoggingRegionHierarchyContext.Provider, {
    value: e,
    children: renderer
      ? renderer({
          name,
          children: m,
        })
      : m,
  });
};
