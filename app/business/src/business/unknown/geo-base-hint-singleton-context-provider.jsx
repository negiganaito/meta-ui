import React, { useCallback, useMemo, useState } from 'react';
import { GeoBaseHintSingletonContext } from '@meta-business/contexts/geo-base-hint-singleton-context';

export function GeoBaseHintSingletonContextProvider({ children }) {
  const [groups, setGroups] = useState(new Map());

  const setLastHintLayerForGroup = useCallback(
    (group, hintLayer) => {
      const updatedGroups = new Map(groups);
      updatedGroups.set(group, hintLayer);
      setGroups(updatedGroups);
    },
    [groups],
  );

  const contextValue = useMemo(
    () => ({
      groups,
      setLastHintLayerForGroup,
    }),
    [groups, setLastHintLayerForGroup],
  );

  return <GeoBaseHintSingletonContext.Provider value={contextValue}>{children}</GeoBaseHintSingletonContext.Provider>;
}
