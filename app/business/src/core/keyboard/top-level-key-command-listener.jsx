import React from 'react';

import { BaseKeyCommandListener } from './base-key-command-listener';
import { CometGlobalKeyCommandWidget } from './comet-global-key-command-widget';

export const TopLevelKeyCommandListener = ({ children }) => {
  return (
    <CometGlobalKeyCommandWidget.Wrapper debugName="global">
      <BaseKeyCommandListener observersEnabled>{children}</BaseKeyCommandListener>
    </CometGlobalKeyCommandWidget.Wrapper>
  );
};
