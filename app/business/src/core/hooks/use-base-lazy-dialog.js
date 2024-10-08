import { useCallback, useContext } from 'react';
import { CometDialogContext } from '@meta-core/contexts/comet-dialog-context';
import { CometSuspendedDialogImpl } from '@meta-core/dialog/comet-suspended-dialog-impl';
import { lazyLoadComponent } from '@meta-core/lazy-load-component/lazy-load-component';

// eslint-disable-next-line max-params
export const useBaseLazyDialog = (a, fallback, tracePolicy, ee) => {
  let f = useContext(CometDialogContext);
  let baseModalProps = !ee ? void 0 : ee.baseModalProps;

  const e = useCallback(
    (dialogProps, h, replaceCurrentDialog) => {
      let dialog = lazyLoadComponent(a);
      f(
        CometSuspendedDialogImpl,
        {
          dialog: dialog,
          dialogProps: dialogProps,
          fallback: fallback,
        },
        {
          loadType: 'lazy',
          tracePolicy: tracePolicy,
        },
        h,
        {
          baseModalProps: baseModalProps,
          replaceCurrentDialog: replaceCurrentDialog,
        },
      );
    },
    [f, baseModalProps, a, fallback, tracePolicy],
  );

  let h = useCallback(() => {
    a.preload();
  }, [a]);

  return [e, h];
};
