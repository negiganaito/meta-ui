import { useCallback, useContext } from 'react';
import { CometDialogContext } from '@meta-core/contexts/comet-dialog-context';
import { CometSuspendedDialogImpl } from '@meta-core/dialog/comet-suspended-dialog-impl';
import { lazyLoadComponent } from '@meta-core/lazy-load-component/lazy-load-component';

// eslint-disable-next-line max-params
export const useBaseLazyDialog = (a, b, d, ee) => {
  let f = useContext(CometDialogContext);
  let g = !ee ? void 0 : ee.baseModalProps;

  const e = useCallback(
    (e, h, i) => {
      let j = lazyLoadComponent(a);
      f(
        CometSuspendedDialogImpl,
        {
          dialog: j,
          dialogProps: e,
          fallback: b,
        },
        {
          loadType: 'lazy',
          tracePolicy: d,
        },
        h,
        {
          baseModalProps: g,
          replaceCurrentDialog: i,
        },
      );
    },
    [f, g, a, b, d],
  );

  let h = useCallback(() => {
    a.preload();
  }, [a]);

  return [e, h];
};
