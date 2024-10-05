import React, { forwardRef, useCallback, useReducer } from 'react';

import { BaseMultiPageViewContainer } from './base-multi-page-view-container';
import { BaseMultiPageViewReducer } from './base-multi-page-view-reducer';

// type BaseMultiPageViewProps = {
//   disableAutoFocus: boolean
//   disableFocusContainment: boolean
//   fallback?
//   children?: ReactNode
// }

export const BaseMultiPageView = forwardRef((props, ref) => {
  const [pageHistory, dispatch] = useReducer(BaseMultiPageViewReducer.reducer, BaseMultiPageViewReducer.initialState);

  const onAddPageCb = useCallback(
    (direction, component, options) => {
      dispatch({
        component,
        direction,
        pageKey: !options ? undefined : options.pageKey,
        type: 'push_page',
      });
    },
    [dispatch],
  );

  const onPopPageCb = useCallback(
    (page) => {
      return dispatch({
        index: !page ? undefined : page.index,
        pageKey: !page ? undefined : page.pageKey,
        type: 'pop_page',
      });
    },
    [dispatch],
  );

  const onClearRemovedPagesCb = useCallback(() => {
    dispatch({
      type: 'clear_removed_pages',
    });
  }, [dispatch]);

  return (
    <BaseMultiPageViewContainer
      {...props}
      onAddPage={onAddPageCb}
      onClearRemovedPages={onClearRemovedPagesCb}
      onPopPage={onPopPageCb}
      pageHistory={pageHistory}
      ref={ref}
    />
  );
});
