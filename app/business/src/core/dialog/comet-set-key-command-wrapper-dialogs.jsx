/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useContext, useEffect } from 'react';
import { CometKeyCommandContext } from '@meta-core/contexts/comet-key-command-context';
import { CometKeyCommandSettingsContext } from '@meta-core/contexts/comet-key-command-settings-context';
import emptyFunction from 'fbjs/lib/emptyFunction';

import { useCometLazyDialog } from './use-comet-lazy-dialog';

export function CometSetKeyCommandWrapperDialogs() {
  let a;
  let b = useContext(CometKeyCommandSettingsContext);
  // eslint-disable-next-line no-cond-assign
  a = (a = useContext(CometKeyCommandContext)) ? a : {};
  let d = a.setShowModifiedKeyCommandWrapperDialogRef;
  let e = a.setShowSingleCharacterKeyCommandWrapperDialogRef;
  a = useCometLazyDialog('CometModifiedKeyCommandWrapperDialog');
  let f = a[0];
  a = useCometLazyDialog('CometKeyCommandWrapperDialog');

  let g = a[0];
  useEffect(() => {
    let a = emptyFunction;
    d &&
      (a = d((a, d) => {
        f(
          {
            command: a,
            setModifiedKeyboardShortcutsPreference: b.setModifiedKeyboardShortcutsPreference,
            singleCharDescription: d,
          },
          emptyFunction,
        );
      }));
    return a;
  }, [d, f, b.setModifiedKeyboardShortcutsPreference]);

  useEffect(() => {
    let a = emptyFunction;
    e &&
      (a = e((a, d) => {
        g(
          {
            command: a,
            setAreSingleKeysDisabled: b.setAreSingleKeysDisabled,
            singleCharDescription: d,
          },
          emptyFunction,
        );
      }));
    return a;
  }, [e, g, b.setAreSingleKeysDisabled]);

  return null;
}
