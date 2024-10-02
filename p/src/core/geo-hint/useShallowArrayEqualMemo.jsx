import shallowArrayEqual from '../business/helpers/shallowArrayEqual';
import useCustomEqualityMemo from '../business/hooks/useCustomEqualityMemo';

function useShallowArrayEqualMemo(value) {
  return useCustomEqualityMemo(value, shallowArrayEqual);
}

export default useShallowArrayEqualMemo;
