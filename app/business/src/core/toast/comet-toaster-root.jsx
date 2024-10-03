import React, { useMemo } from 'react';
import { CometErrorBoundary } from '@meta-core/error/comet-error-boundary';
import { recoverableViolation } from '@meta-core/error/recoverable-violation';

import { CometLazyToasterView_DO_NOT_USE } from './comet-lazy-toaster-view_DO_NOT_USE';

const filters = new Set(['CometToastNotification']);

function onError(error) {
  recoverableViolation('The toaster is broken', 'CometAppShell', {
    error,
  });
}

const useHideNotificationsToasts = false;

export const CometToasterRoot = (props) => {
  const { align, maxWidth, position } = props;

  return useMemo(() => {
    return (
      <CometErrorBoundary onError={onError}>
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <CometLazyToasterView_DO_NOT_USE
          align={align}
          filterToasts={useHideNotificationsToasts ? filters : null}
          maxWidth={maxWidth}
          position={position}
        />
      </CometErrorBoundary>
    );
  }, [align, maxWidth, useHideNotificationsToasts]);
};
