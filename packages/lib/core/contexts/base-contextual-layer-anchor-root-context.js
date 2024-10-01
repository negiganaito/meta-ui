import { createContext } from 'react';

export const BaseContextualLayerAnchorRootContext = createContext({
  current: document.body,
});
