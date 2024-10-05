import { jsx } from 'react/jsx-runtime';
import { CometPlaceholder } from '@meta-core/placeholder/comet-placeholder';

export const CometSuspendedDialogImpl = ({ dialog, dialogProps, fallback, onClose, onHide }) => {
  return jsx(CometPlaceholder, {
    fallback: fallback(onClose),
    children: jsx(dialog, { ...dialogProps, onClose, onHide }),
  });
};

CometSuspendedDialogImpl.displayName = 'CometSuspendedDialogImpl [from CometSuspendedDialogImpl.react]';
