import { useCustomEqualityMemo } from '@meta-core/hooks/use-custom-equality-memo';

import { areEqual } from './are-equal';

export const useDeepEqualMemo = (val) => {
  return useCustomEqualityMemo(val, areEqual);
};
