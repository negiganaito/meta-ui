import { createContext } from 'react';

export const RelayProfilerContext = createContext({
  wrapPrepareQueryResource: (a) => {
    return a();
  },
});
