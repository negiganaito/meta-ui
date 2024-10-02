import { createContext } from 'react';

export const HiddenSubtreeContext = createContext({
  backgrounded: false,
  hidden: false,
  hiddenOrBackgrounded: false,
  // eslint-disable-next-line camelcase
  hiddenOrBackgrounded_FIXME: false,
});
