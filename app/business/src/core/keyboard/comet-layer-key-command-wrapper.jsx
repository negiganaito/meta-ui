import React from 'react';

import { CometLayerKeyCommandWidget } from './comet-layer-key-command-widget';
import { SetActiveLayerIfAttached } from './set-active-layer-if-attached';

export const CometLayerKeyCommandWrapper = ({ children, debugName }) => {
  return (
    <CometLayerKeyCommandWidget.Wrapper debugName={debugName}>
      <SetActiveLayerIfAttached debugName={debugName} />
      {children}
    </CometLayerKeyCommandWidget.Wrapper>
  );
};
