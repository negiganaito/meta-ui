import { useEffect } from 'react';

import { useUnsafeRef_DEPRECATED } from './use-unsafe-ref_DEPRECATED';

// export function useCustomEqualityMemo(a, b) {
//   let d = useUnsafeRef_DEPRECATED(a);
//   let e = b(d.current, a) ? d.current : a;
//   useEffect(() => {
//     d.current = e;
//   }, [e]);
//   return e;
// }

export function useCustomEqualityMemo(value, compare) {
  const ref = useUnsafeRef_DEPRECATED(value);
  const memoizedValue = compare(ref.current, value) ? ref.current : value;

  useEffect(() => {
    ref.current = memoizedValue;
  }, [memoizedValue]);

  return memoizedValue;
}
