import { useCustomEqualityMemo } from '@meta-core/hooks/use-custom-equality-memo';
import shallowEqual from 'fbjs/lib/shallowEqual';

export function useShallowEqualMemo(val) {
  return useCustomEqualityMemo(val, shallowEqual);
}
