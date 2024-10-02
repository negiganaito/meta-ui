import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { GeoPrivateBasePortalTargetContext } from '@meta-ui/business/contexts';
import { useStable } from '@meta-ui/core/hooks';
import { CometVisualCompletionAttributes } from '@meta-ui/core/react-utils';
import { Promise } from '@meta-ui/core/utils';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { GeoPrivateBaseDOMContainer } from './geo-private-base-dom-container';

export const GeoPrivateBasePortal = ({ children, target }) => {
  const contextTarget = useContext(GeoPrivateBasePortalTargetContext);
  const portalTarget = target || contextTarget;

  const node = useStable(() => {
    return ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
  });

  if (!ExecutionEnvironment.canUseDOM) {
    // eslint-disable-next-line prefer-promise-reject-errors
    throw Promise.reject();
  }

  if (!portalTarget) {
    return null;
  }

  let content = children;

  return createPortal(
    <div {...CometVisualCompletionAttributes.IGNORE}>
      <GeoPrivateBasePortalTargetContext.Provider value={node}>{content}</GeoPrivateBasePortalTargetContext.Provider>
      <GeoPrivateBaseDOMContainer node={node} />
    </div>,
    portalTarget,
  );
};

GeoPrivateBasePortal.displayName = `${GeoPrivateBasePortal.name} [from some-module-id]`;
