/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CometDialogContext } from '@meta-core/contexts/comet-dialog-context';
import { CometErrorBoundary } from '@meta-core/error/comet-error-boundary';
import { FBLogger } from '@meta-core/error/fb-logger';
import { useIsCalledDuringRender } from '@meta-core/hooks/use-is-called-during-render';
import { useIsMountedRef } from '@meta-core/hooks/use-is-mounted-ref';
import { cometPushToast } from '@meta-core/toast/comet-push-toast';

import { BaseCometModal } from './base-comet-modal';

const BaseModal = BaseCometModal;

const DialogComponent = ({ dialogConfig, dialogConfigsRef, displayBaseModal_DO_NOT_USE, removeDialogConfig }) => {
  const animationFrameRef = useRef(null);
  const { dialog: Dialog, dialogProps } = dialogConfig;
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  let onClose = useCallback(
    (..._arguments) => {
      // eslint-disable-next-line no-inner-declarations, no-var, no-undef
      for (var a = _arguments.length, args = new Array(a), f = 0; f < a; f++) {
        // eslint-disable-next-line no-undef
        args[f] = _arguments[f];
      }

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      let index = dialogConfigsRef.current.indexOf(dialogConfig);
      if (index < 0) {
        FBLogger('comet_ui')
          .blameToPreviousFrame()
          .mustfix('Attempting to close a dialog that does not exist anymore.');
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(() => {
        removeDialogConfig(dialogConfig, args);
        animationFrameRef.current = null;
      });
    },
    [dialogConfig, dialogConfigsRef, removeDialogConfig],
  );

  const onError = useCallback(() => {
    onClose();
    cometPushToast.cometPushErrorToast({
      message: "Something isn't working. This may be because of a technical error we're working to fix.",
      truncateText: false,
    });
  }, [onClose]);

  return (
    <CometErrorBoundary onError={onError}>
      {displayBaseModal_DO_NOT_USE ? (
        <BaseModal
          hidden={isHidden}
          interactionDesc={dialogConfig.interactionDesc}
          interactionUUID={dialogConfig.interactionUUID}
          isOverlayTransparent={dialogConfig.baseModalProps ? dialogConfig.isOverlayTransparent : undefined}
          stackingBehavior="above-nav"
        >
          <Dialog {...dialogProps} onClose={onClose} onHide={setIsHidden} />
        </BaseModal>
      ) : (
        <Dialog {...dialogProps} onClose={onClose} onHide={setIsHidden} />
      )}
    </CometErrorBoundary>
  );
};

export const CometTransientDialogProvider = ({ displayBaseModal_DO_NOT_USE = true, ...rest }) => {
  const [dialogs, setDialogs] = useState([]);
  let isMountedRef = useIsMountedRef();
  let dialogConfigsRef = useRef(dialogs);
  const isCalledDuringRender = useIsCalledDuringRender();

  const cometDialogContextValue = useCallback(
    // eslint-disable-next-line max-params
    (dialogComp, dialogProps, interaction, onClose, options) => {
      // eslint-disable-next-line no-unused-vars
      const { loadType, preloadTrigger, tracePolicy } = interaction;

      // interaction.addMetadata("interaction_type", "dialog");
      // interaction.addMetadata("load_type", loadType);

      if (preloadTrigger) {
        // interaction.addMetadata("preload_trigger", preloadTrigger);
      }

      let interactionDesc = 'Dialog';

      // setDialogs((currentDialogs) => {
      //   let c;
      //   // eslint-disable-next-line no-cond-assign
      //   c = (c = !options ? undefined : options.replaceCurrentDialog)
      //     ? c
      //     : false;
      //   let e = {
      //     baseModalProps: !options ? undefined : options.baseModalProps,
      //     dialog: dialogComp,
      //     dialogProps: dialogProps,
      //     interactionDesc: interactionDesc,
      //     // interactionUUID: i,
      //     onClose: onClose,
      //     tracePolicy,
      //   };
      //   return c
      //     ? currentDialogs.slice(0, currentDialogs.length - 1).concat(e)
      //     : currentDialogs.concat(e);
      // });

      setDialogs((currentDialogs) => {
        const replaceCurrent = options?.replaceCurrentDialog ?? false;
        const newDialogConfig = {
          baseModalProps: options?.baseModalProps,
          dialog: dialogComp,
          dialogProps: dialogProps,
          interactionDesc,
          onClose,
          tracePolicy,
        };
        return replaceCurrent
          ? currentDialogs.slice(0, -1).concat(newDialogConfig)
          : currentDialogs.concat(newDialogConfig);
      });
    },
    [isCalledDuringRender],
  );

  useEffect(() => {
    dialogConfigsRef.current = dialogs;
  }, [dialogs]);

  const removeDialogConfig = useCallback(
    (dialogConfig, args) => {
      if (!isMountedRef.current) {
        return;
      }

      setDialogs((currentDialogs) => {
        let index = currentDialogs.indexOf(dialogConfig);
        return index < 0 ? currentDialogs : currentDialogs.slice(0, index);
      });

      if (dialogConfig.onClose) {
        dialogConfig.onClose.apply(dialogConfig, args);
      }
      // b("cr:945") && b("cr:945").logClose(a.tracePolicy, a.interactionUUID);
    },
    [isMountedRef],
  );

  return (
    <CometDialogContext.Provider value={cometDialogContextValue}>
      {rest.children}
      {dialogs.map((dialogConfig, index) => {
        return (
          <DialogComponent
            key={index}
            dialogConfig={dialogConfig}
            dialogConfigsRef={dialogConfigsRef}
            displayBaseModal_DO_NOT_USE={displayBaseModal_DO_NOT_USE}
            removeDialogConfig={removeDialogConfig}
          />
        );
      })}
    </CometDialogContext.Provider>
  );
};
