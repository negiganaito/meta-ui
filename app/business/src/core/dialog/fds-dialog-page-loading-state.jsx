import React from 'react';

import { FDSDialogHeader } from './fds-dialog-header';
import { FDSDialogLoadingStateImpl } from './fds-dialog-loading-state-impl';
import { FDSDialogPage } from './fds-dialog-page';

export function FDSDialogPageLoadingState({ onClose }) {
  return (
    <FDSDialogPage footer={null} header={<FDSDialogHeader onClose={onClose} />}>
      <FDSDialogLoadingStateImpl />
    </FDSDialogPage>
  );

  // return jsx(FDSDialogPage, {
  //   footer: null,
  //   header: jsx(FDSDialogHeader, {
  //     onClose,
  //   }),
  //   children: jsx(FDSDialogLoadingStateImpl, {}),
  // });
}
