import React, { unstable_Scope as UnstableScope, useLayoutEffect, useRef } from 'react';

import { setElementCanTab } from './set-element-can-tab';

export function FocusInertRegion(props) {
  const { children, disabled = false, focusQuery } = props;

  const scopeRef = useRef(null);

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (focusQuery && scope) {
      const nodes = scope.DO_NOT_USE_queryAllNodes(focusQuery);
      if (nodes) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          setElementCanTab.setElementCanTab(node, disabled);
        }
      }
    }
  }, [disabled, focusQuery]);

  return <UnstableScope ref={scopeRef}>{children}</UnstableScope>;
}
