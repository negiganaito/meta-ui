import React from 'react';
import { BaseContextualLayerAnchorRootContext } from '@meta-ui/core/contexts';
import { useStable, useUnsafeRef_DEPRECATED } from '@meta-ui/core/hooks';
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
