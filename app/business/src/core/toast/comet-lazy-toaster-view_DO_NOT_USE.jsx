import React, { useEffect, useState } from 'react';
import { CometPlaceholder } from '@meta-core/placeholder/comet-placeholder';

import { CometToasterView_DO_NOT_USE } from './comet-toaster-view_DO_NOT_USE';
import { useToasterStateManager } from './use-toaster-state-manager';

function hasToasts(toasterState) {
  return Object.keys(toasterState.getState()).length > 0;
}

export function CometLazyToasterView_DO_NOT_USE(props) {
  const toasterState = useToasterStateManager();

  let [hasToastsInitially, setHasToastsInitially] = useState(() => {
    return hasToasts(toasterState);
  });

  useEffect(() => {
    if (hasToastsInitially) {
      return;
    }
    let findToast = hasToasts(toasterState);

    if (findToast) {
      setHasToastsInitially(true);
      return;
    }

    // eslint-disable-next-line no-var
    var listener = toasterState.addListener(() => {
      listener.remove();
      setHasToastsInitially(true);
    });
    return listener.remove;
  }, [toasterState, hasToastsInitially]);

  return hasToastsInitially ? (
    <CometPlaceholder fallback={null}>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <CometToasterView_DO_NOT_USE loadImmediately {...props} />
    </CometPlaceholder>
  ) : undefined;
}
