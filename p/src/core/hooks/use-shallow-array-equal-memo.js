import { shallowArrayEqual } from '@meta-ui/core/utils';

import { useCustomEqualityMemo } from './use-custom-equality-memo';

export function useShallowArrayEqualMemo(val) {
  return useCustomEqualityMemo(val, shallowArrayEqual);
}
