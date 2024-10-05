import React from 'react';
import { FDSDialogLoadingStateContext } from '@meta-core/contexts/fds-dialog-loading-state-context';

import { FDSDialog } from './fds-dialog';
import { FDSDialogLoadingStateHeader } from './fds-dialog-loading-state-header';
import { FDSDialogLoadingStateImpl } from './fds-dialog-loading-state-impl';

export const FDSDialogLoadingState = ({ 'aria-label': al = undefined, onClose, withCloseButton }) => {
  return (
    <FDSDialogLoadingStateContext.Provider value={true}>
      <FDSDialog
        aria-label={al ?? 'Loading...'}
        footer={undefined}
        header={<FDSDialogLoadingStateHeader onClose={onClose} withcloseButton={withCloseButton} />}
        onClose={onClose}
      >
        <FDSDialogLoadingStateImpl />
      </FDSDialog>
    </FDSDialogLoadingStateContext.Provider>
  );
};

FDSDialogLoadingState.displayName = 'FDSDialogLoadingState [from FDSDialogLoadingState]';
