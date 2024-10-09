import { uniqueID } from '@meta-core/utils/unique-id';

import { useUnsafeRef_DEPRECATED } from './use-unsafe-ref_DEPRECATED';

export const useUniqueID = () => {
  const ref = useUnsafeRef_DEPRECATED(null);

  if (!ref.current) {
    ref.current = uniqueID();
  }

  return ref.current;
};
