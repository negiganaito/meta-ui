import React, { useContext } from 'react';
import { BaseHeadingContext } from '@meta-core/contexts/base-heading-context';

export function BaseHeadingContextWrapper({ children }) {
  const value = useContext(BaseHeadingContext);

  return <BaseHeadingContext.Provider value={value + 1}>{children}</BaseHeadingContext.Provider>;
}
