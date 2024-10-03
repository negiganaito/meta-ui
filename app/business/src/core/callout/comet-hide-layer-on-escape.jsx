import React, { useMemo } from 'react';
import { CometComponentWithKeyCommands } from '@meta-core/keyboard/comet-component-with-key-commands';
import { CometKeys } from '@meta-core/utils/comet-keys';

export const CometHideLayerOnEscape = (props) => {
  const { children, debugName = 'ModalLayer', onHide } = props;

  const commandConfigs = useMemo(() => {
    return [
      {
        command: {
          key: CometKeys.ESCAPE,
        },
        description: 'Close',
        handler: onHide,
        triggerFromInput: true,
        triggerOnRepeats: false,
      },
    ];
  }, [onHide]);

  return (
    <CometComponentWithKeyCommands commandConfigs={commandConfigs} debugName={debugName} isWrapperFocusable>
      {children}
    </CometComponentWithKeyCommands>
  );
};
