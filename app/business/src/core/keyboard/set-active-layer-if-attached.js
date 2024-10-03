import { useContext, useEffect } from 'react';
import { CometKeyCommandUtilsContext } from '@meta-core/contexts/comet-key-command-utils-context';
import { HiddenSubtreeContext } from '@meta-core/contexts/hidden-subtree-context';
import { recoverableViolation } from '@meta-core/error/recoverable-violation';

import { CometLayerKeyCommandWidget } from './comet-layer-key-command-widget';

export const SetActiveLayerIfAttached = () => {
  const hiddenSubtreeContextValue = useContext(HiddenSubtreeContext);
  const cometKeyCommandUtilsContext = useContext(CometKeyCommandUtilsContext);

  const isSetActiveLayer = cometKeyCommandUtilsContext && cometKeyCommandUtilsContext.setActiveLayer;

  const CometLayerKeyCommandWidgetContext = useContext(CometLayerKeyCommandWidget.Context);

  useEffect(() => {
    if (!isSetActiveLayer) {
      recoverableViolation('The current layer is not wrapped in a *KeyCommandListener', 'comet_ax');
      return;
    }

    if (!CometLayerKeyCommandWidgetContext) {
      recoverableViolation('setActiveLayer not wrapped in CometLayerKeyCommandWidget.Wrapper', 'comet_ax');
      return;
    }
    hiddenSubtreeContextValue.hiddenOrBackgrounded || isSetActiveLayer(CometLayerKeyCommandWidgetContext);
  }, [CometLayerKeyCommandWidgetContext, hiddenSubtreeContextValue, isSetActiveLayer]);

  return null;
};
