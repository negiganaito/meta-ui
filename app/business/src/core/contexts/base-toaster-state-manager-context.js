import React from 'react';
import { BaseToasterStateManager } from '@meta-core/toast/base-toaster-state-manager';

export const BaseToasterStateManagerContext = React.createContext(BaseToasterStateManager.getInstance());
