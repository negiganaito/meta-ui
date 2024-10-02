import { createContext } from 'react';

const initial = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
};

export const BaseViewportMarginsContext = createContext(initial);
