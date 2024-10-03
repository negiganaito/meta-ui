import { useContext } from 'react';
import { BaseToasterStateManagerContext } from '@meta-core/contexts/base-toaster-state-manager-context';

export function useToasterStateManager() {
  return useContext(BaseToasterStateManagerContext);
}
