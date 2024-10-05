import React, { useReducer } from 'react';
import { GeoPrivateToasterContext } from '@meta-business/contexts/geo-private-toaster-context';
import { GeoPrivateBasePortal } from '@meta-business/contextual/geo-private-base-portal';
import { useStable } from '@meta-core/hooks/use-stable';

import { GeoPrivateToaster } from './geo-private-toaster';
import { GeoPrivateToasterUtils } from './geo-private-toaster-utils';

export function GeoToasterProvider({ children, 'data-testid': dataTestId }) {
  const [toasts, dispatch] = useReducer(GeoPrivateToasterUtils.itemsReducer, []);

  const toasterActions = useStable(() => ({
    add: function (toast, config) {
      const key = GeoPrivateToasterUtils.createItemKey();
      const onAfterHide = () => dispatch({ type: 'remove', key });
      dispatch({
        type: 'add',
        toast,
        config,
        onAfterHide,
        key,
      });
      return key;
    },
    remove: function (key) {
      return dispatch({ type: 'hide', key });
    },
    clear: function () {
      return dispatch({ type: 'hideAll' });
    },
  }));

  return (
    <GeoPrivateToasterContext.GeoPrivateToasterContext.Provider value={toasterActions}>
      <GeoPrivateToasterContext.GeoPrivateToasterItemsContext.Provider value={toasts}>
        {children}
        {toasts.length > 0 && (
          <GeoPrivateBasePortal target={document.body}>
            <GeoPrivateToaster data-testid={dataTestId} items={toasts} />
          </GeoPrivateBasePortal>
        )}
      </GeoPrivateToasterContext.GeoPrivateToasterItemsContext.Provider>
    </GeoPrivateToasterContext.GeoPrivateToasterContext.Provider>
  );
}
