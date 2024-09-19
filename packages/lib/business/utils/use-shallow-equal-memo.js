import shallowEqual from 'fbjs/lib/shallowEqual';

import { useCustomEqualityMemo } from './use-custom-equality-memo';

export function useShallowEqualMemo(a) {
  return useCustomEqualityMemo(a, shallowEqual);
}
