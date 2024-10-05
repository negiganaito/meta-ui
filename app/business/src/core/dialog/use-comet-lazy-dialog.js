import { useBaseLazyDialog } from '@meta-core/hooks/use-base-lazy-dialog';

import { FDSDialogLoadingState } from './fds-dialog-loading-state';

const fallback = function (onClose) {
  return <FDSDialogLoadingState onClose={onClose} />;
};

export function useCometLazyDialog(a, b) {
  // let d = c("tracePolicyFromResource")("comet.dialog", a);
  return useBaseLazyDialog(a, b ?? fallback, 'comet.dialog.CometModifiedKeyCommandWrapperDialog.react');
}
