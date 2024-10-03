import React, { useCallback, useMemo, useReducer, useRef } from 'react';
import { CometErrorBoundary } from '@meta-core/error/comet-error-boundary';
import { BaseView } from '@meta-core/layout/base-view';
import { CometPlaceholder } from '@meta-core/placeholder/comet-placeholder';

import { BaseCalloutReducer } from './base-callout-reducer';

export const BaseCalloutManager = ({ children, context: Context, implementation: Implementation, initialState }) => {
  const [state, dispatch] = useReducer(BaseCalloutReducer, initialState);

  const imperativeRef = useRef(null);

  const addCallout = useCallback((payload) => {
    dispatch({
      payload,
      type: 'addCallout',
    });
  }, []);

  const removeCallout = useCallback((a) => {
    dispatch({
      payload: a,
      type: 'removeCallout',
    });
  }, []);

  const repositionCallout = useCallback(() => {
    let a;
    !(a = imperativeRef.current) ? void 0 : a.reposition();
  }, []);

  const contextValue = useMemo(() => {
    return {
      addCallout,
      removeCallout,
      repositionCallout,
    };
  }, [addCallout, removeCallout, repositionCallout]);

  return (
    <Context.Provider value={contextValue}>
      <BaseView>{children}</BaseView>
      <CometErrorBoundary>
        <CometPlaceholder fallback={null}>
          <Implementation {...state} imperativeRef={imperativeRef} />
        </CometPlaceholder>
      </CometErrorBoundary>
    </Context.Provider>
  );
};
