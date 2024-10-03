/* eslint-disable no-unused-vars */

import React from 'react';
import { BasePortalTargetContext } from '@meta-core/contexts/base-portal-target-context';
import { BaseDOMContainer } from '@meta-core/contextual/base-dom-container';
import { useStable } from '@meta-core/hooks/use-stable';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

const justknobx713 = true;

const l = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
};

export const CometAppViewStack = ({ baseView, topNavigationComponent, useBodyAsPortalsContainer = false }) => {
  const f = useStable(() => {
    return ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
  });

  // const e = useContext(CometRouterPushViewStackContext);
  // const Comp =
  //   !e &&
  //   jsx(BaseViewportMarginsContext.Provider, {
  //     value: l,
  //     children: e.reduceRight((a,b) => {

  //     }),
  //   });
  // const g = false;

  return (
    <>
      <BasePortalTargetContext.Provider value={useBodyAsPortalsContainer ? document.body : f}>
        {baseView}
      </BasePortalTargetContext.Provider>
      {!useBodyAsPortalsContainer && <BaseDOMContainer node={f} />}
    </>
  );
};
