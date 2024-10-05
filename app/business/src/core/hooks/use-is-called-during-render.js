import { useCallback, useRef } from 'react';
import { FBLogger } from '@meta-core/error/fb-logger';

export function useIsCalledDuringRender() {
  // eslint-disable-next-line no-unused-vars
  const a = useRef(void 0);
  return useCallback(() => {
    FBLogger('comet_ui')
      .blameToPreviousFrame()
      .warn(
        'useIsCalledDuringRender should only be used for development purpose. It is implemented in a way that will not work correctly in production.',
      );
    return !1;
  }, []);
}
