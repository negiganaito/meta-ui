import React from 'react';
import { BaseContextualLayerAnchorRootContext } from '@meta-core/contexts/base-contextual-layer-anchor-root-context';
import { useStable } from '@meta-core/hooks/use-stable';
import { useUnsafeRef_DEPRECATED } from '@meta-core/hooks/use-unsafe-ref_DEPRECATED';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { BaseDOMContainer } from './base-dom-container';

export const BaseContextualLayerAnchorRoot = ({ children }) => {
  const el = useStable(() => (ExecutionEnvironment.canUseDOM ? document.createElement('div') : null));

  const baseContextualLayerAnchorRootValue = useUnsafeRef_DEPRECATED(el);

  return (
    <>
      <BaseContextualLayerAnchorRootContext.Provider value={baseContextualLayerAnchorRootValue}>
        {children}
      </BaseContextualLayerAnchorRootContext.Provider>
      <BaseDOMContainer node={el} />
    </>
  );

  // return jsxs(React.Fragment, {
  //   children: [
  //     jsx(BaseContextualLayerAnchorRootContext.Provider, {
  //       children,
  //       value: baseContextualLayerAnchorRootValue,
  //     }),
  //     jsx(BaseDOMContainer, {
  //       node: el,
  //     }),
  //   ],
  // });
};
