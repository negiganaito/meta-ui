import React from 'react';
import { FDSCalloutManager } from '@meta-core/callout/fds-callout-manager';

import { BaseToasterStateManagerProvider } from './base-toaster-state-manager-provider';

export const CometAppShell = ({ children, toaster, ToasterStateManagerProvider = BaseToasterStateManagerProvider }) => {
  return (
    <ToasterStateManagerProvider>
      {/* <ToastListener /> */}
      <FDSCalloutManager>{children}</FDSCalloutManager>
      {toaster}
    </ToasterStateManagerProvider>
  );
};

// const ToastListener = () => {
//   useEffect(() => {
//     ErrorGuard.applyWithGuard(
//       () => CometNetworkStatusToast.subscribe(),
//       null,
//       []
//     );
//   }, []);

//   return undefined;
// };
