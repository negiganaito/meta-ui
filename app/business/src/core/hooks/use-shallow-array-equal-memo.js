import { shallowArrayEqual } from '@meta-core/utils/shallow-array-equal';

import { useCustomEqualityMemo } from './use-custom-equality-memo';

export function useShallowArrayEqualMemo(val) {
  return useCustomEqualityMemo(val, shallowArrayEqual);
}
