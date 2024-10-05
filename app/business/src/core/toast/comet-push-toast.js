/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from 'react';
import { FDSIcon } from '@meta-core/image/fds-icon';
import { FBNucleusCautionTriangleFilled20Svg } from '@meta-icons/fb-nucleus-caution-triangle-filled-20.svg';

import { BaseToasterStateManager } from './base-toaster-state-manager';
import { CometToast } from './comet-toast';

const defaultInstance = BaseToasterStateManager.getInstance();

let toast;

function _cometPushToast(props, duration = 2750, externalInstance) {
  const store = externalInstance ?? defaultInstance;

  toast = store.push(
    <CometToast
      {...props}
      // loadImmediately
      onDismiss={() => {
        return store.expire(toast);
      }}
    />,
    duration,
  );
  return toast;
}

function cometPushSimpleToast(message, duration) {
  return _cometPushToast(
    {
      message: message,
    },
    duration,
  );
}

function cometPushErrorToast(props, duration = 2750, externalInstance) {
  return _cometPushToast(
    {
      ...props,
      // icon: <FDSIcon color="warning" icon={fbicon._(ix(502062), 20)} />,
      icon: <FDSIcon color="warning" icon={FBNucleusCautionTriangleFilled20Svg} size={20} />,
    },
    duration,
    externalInstance,
  );
}

export const cometPushToast = {
  cometPushToast: _cometPushToast,
  cometPushSimpleToast,
  cometPushErrorToast,
};
