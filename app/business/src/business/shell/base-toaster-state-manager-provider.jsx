import React from 'react';
import { BaseToasterStateManagerContext } from '@meta-core/contexts/base-toaster-state-manager-context';
import { BaseToasterStateManager } from '@meta-core/toast/base-toaster-state-manager';

const instance = BaseToasterStateManager.getInstance();

export function BaseToasterStateManagerProvider({ children }) {
  return <BaseToasterStateManagerContext.Provider value={instance}>{children}</BaseToasterStateManagerContext.Provider>;
}
