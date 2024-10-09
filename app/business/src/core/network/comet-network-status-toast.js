import React from 'react';
import { fbicon } from '@meta-core/image/fb-icon';
import { ix } from '@meta-core/image/ix';
import { SVGIcon } from '@meta-core/image/svg-icon';
import { TetraIcon } from '@meta-core/image/tetra-icon';
import { BaseToasterStateManager } from '@meta-core/toast/base-toaster-state-manager';
import { cometPushToast } from '@meta-core/toast/comet-push-toast';
import { CometIconWirelessSlashFilled } from '@meta-icons/comet-icon-wireless-slash-filled';

import { NetworkStatus } from './network-status';

let Component;
let networkRef = null;

const onNetworkChange = ({ online }) => {
  let instance = BaseToasterStateManager.getInstance();

  if (Component !== null && Component !== undefined) {
    instance.expire(Component);
    Component = null;
  }

  if (online) {
    Component = cometPushToast.cometPushToast(
      {
        icon: <TetraIcon color="positive" icon={fbicon._(ix(485124), 24)} />,
        message: 'Your internet connection was restored.',
      },
      4e3,
      instance,
    );
  } else {
    Component = cometPushToast.cometPushToast(
      {
        action: {
          label: 'Refresh',
          onPress: () => {
            window.location.reload();
          },
        },

        icon: <TetraIcon color="disabled" icon={SVGIcon.legacySVGIcon(CometIconWirelessSlashFilled)} size={24} />,

        message: 'You are currently offline.',
      },
      4e3,
      instance,
    );
  }
};

const subscribe = () => {
  networkRef = NetworkStatus.onChange(onNetworkChange);
};

const unsubscribe = () => {
  let temp;
  (temp = networkRef) === null ? undefined : temp.remove();
  networkRef = null;
};

// cr:1402
export const CometNetworkStatusToast = {
  subscribe,
  unsubscribe,
};
