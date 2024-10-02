import { useCustomEqualityMemo } from '@meta-ui/core/hooks';
import shallowEqual from 'fbjs/lib/shallowEqual';

export function useShallowEqualMemo(val) {
  return useCustomEqualityMemo(val, shallowEqual);
}
