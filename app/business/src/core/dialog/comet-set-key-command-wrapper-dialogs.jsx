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

// export function CometSetKeyCommandWrapperDialogs() {
//   let a;
//   let b = useContext(CometKeyCommandSettingsContext);
//   // eslint-disable-next-line no-cond-assign
//   a = (a = useContext(CometKeyCommandContext)) ? a : {};
//   let d = a.setShowModifiedKeyCommandWrapperDialogRef;
//   let e = a.setShowSingleCharacterKeyCommandWrapperDialogRef;
//   a = useCometLazyDialog('CometModifiedKeyCommandWrapperDialog');
//   let f = a[0];
//   a = useCometLazyDialog('CometKeyCommandWrapperDialog');

//   let g = a[0];
//   useEffect(() => {
//     let a = emptyFunction;
//     d &&
//       (a = d((a, d) => {
//         f(
//           {
//             command: a,
//             setModifiedKeyboardShortcutsPreference: b.setModifiedKeyboardShortcutsPreference,
//             singleCharDescription: d,
//           },
//           emptyFunction,
//         );
//       }));
//     return a;
//   }, [d, f, b.setModifiedKeyboardShortcutsPreference]);

//   useEffect(() => {
//     let a = emptyFunction;
//     e &&
//       (a = e((a, d) => {
//         g(
//           {
//             command: a,
//             setAreSingleKeysDisabled: b.setAreSingleKeysDisabled,
//             singleCharDescription: d,
//           },
//           emptyFunction,
//         );
//       }));
//     return a;
//   }, [e, g, b.setAreSingleKeysDisabled]);

//   return null;
// }

export function CometSetKeyCommandWrapperDialogs() {
  const keyCommandSettingsContext = useContext(CometKeyCommandSettingsContext);
  const keyCommandContext = useContext(CometKeyCommandContext) || {};

  const setShowModifiedKeyCommandWrapperDialogRef = keyCommandContext.setShowModifiedKeyCommandWrapperDialogRef;
  const setShowSingleCharacterKeyCommandWrapperDialogRef =
    keyCommandContext.setShowSingleCharacterKeyCommandWrapperDialogRef;

  const [showModifiedDialog] = useCometLazyDialog('CometModifiedKeyCommandWrapperDialog');
  const [showSingleCharDialog] = useCometLazyDialog('CometKeyCommandWrapperDialog');

  useEffect(() => {
    let cleanup = emptyFunction;

    if (setShowModifiedKeyCommandWrapperDialogRef) {
      cleanup = setShowModifiedKeyCommandWrapperDialogRef((command, description) => {
        showModifiedDialog(
          {
            command,
            setModifiedKeyboardShortcutsPreference: keyCommandSettingsContext.setModifiedKeyboardShortcutsPreference,
            singleCharDescription: description,
          },
          emptyFunction,
        );
      });
    }

    return cleanup;
  }, [
    setShowModifiedKeyCommandWrapperDialogRef,
    showModifiedDialog,
    keyCommandSettingsContext.setModifiedKeyboardShortcutsPreference,
  ]);

  useEffect(() => {
    let cleanup = emptyFunction;

    if (setShowSingleCharacterKeyCommandWrapperDialogRef) {
      cleanup = setShowSingleCharacterKeyCommandWrapperDialogRef((command, description) => {
        showSingleCharDialog(
          {
            command,
            setAreSingleKeysDisabled: keyCommandSettingsContext.setAreSingleKeysDisabled,
            singleCharDescription: description,
          },
          emptyFunction,
        );
      });
    }

    return cleanup;
  }, [
    setShowSingleCharacterKeyCommandWrapperDialogRef,
    showSingleCharDialog,
    keyCommandSettingsContext.setAreSingleKeysDisabled,
  ]);

  return null;
}
