import { useCallback, useContext, useMemo, useRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { flushSync } from 'react-dom';
import { useUnsafeRef_DEPRECATED } from '@meta-business/utils/use-unsafe-ref_DEPRECATED';
import { CometKeyCommandUtilsContext } from '@meta-core/contexts/comet-key-command-utils-context';
import { recoverableViolation } from '@meta-core/error/recoverable-violation';
import { useGetComposingState } from '@meta-core/hooks/use-get-composing-state';
import { useGlobalEventListener } from '@meta-core/hooks/use-global-event-listener';
import stylex from '@stylexjs/stylex';

import { applyKeyCommand } from './apply-key-command';
import { CometGlobalKeyCommandWidget } from './comet-global-key-command-widget';
import { getActiveCommands } from './get-active-commands';
import { getKeyCommand } from './get-key-command';

function debounce(handler, time) {
  let timeoutID;
  return () => {
    window.clearTimeout(timeoutID);
    timeoutID = window.setTimeout(handler, time);
  };
}

const COMMAND_UPDATE_DELAY = 100;

// type BaseKeyCommandListenerProps = {
//   children?
//   observersEnabled?: boolean
//   className?: string
// }

export function BaseKeyCommandListener({ children, xstyle, observersEnabled }) {
  // let b = a.children,
  //   e = a.observersEnabled
  // a = a.xstyle

  const activeWrapperRef = useRef(null);
  const activeLayerRef = useRef(null);
  const observersSetRef = useRef(new Set());
  const globalKeyCommandContext = useContext(CometGlobalKeyCommandWidget.Context);

  let addObserver = useCallback(
    (observer) => {
      if (!observersEnabled)
        return {
          getActiveCommands: function () {
            recoverableViolation('Key Command observers are not supported in this context', 'comet_ax');
            return null;
          },
          remove: function () {},
        };
      let observersSet = observersSetRef.current;
      observersSet.add(observer);
      return {
        getActiveCommands: function () {
          return getActiveCommands(activeLayerRef.current, activeWrapperRef.current, globalKeyCommandContext);
        },
        remove: function () {
          observersSet['delete'](observer);
        },
      };
    },
    [globalKeyCommandContext, observersEnabled],
  );

  let notifyCommandTriggered = useCallback(
    (key) => {
      observersEnabled &&
        observersSetRef.current.forEach((observer) => {
          return observer({
            key: key,
            type: 'triggered',
          });
        });
    },
    [observersEnabled],
  );

  let notifyCommandUpdate = useMemo(() => {
    return debounce(() => {
      observersEnabled &&
        observersSetRef.current.forEach((a) => {
          return a({
            type: 'update',
          });
        });
    }, COMMAND_UPDATE_DELAY);
  }, [observersEnabled]);
  let setActiveLayer = useCallback(
    (layer) => {
      let isChanged = activeWrapperRef.current !== layer;
      activeWrapperRef.current = layer;
      isChanged && notifyCommandUpdate();
    },
    [notifyCommandUpdate],
  );
  let setActiveWrapper = useCallback(
    (wrapper) => {
      let isChanged = activeLayerRef.current !== wrapper;
      activeLayerRef.current = wrapper;
      isChanged && notifyCommandUpdate();
    },
    [notifyCommandUpdate],
  );

  const keyCommandContextRef = useUnsafeRef_DEPRECATED({
    addObserver,
    notifyCommandUpdate,
    setActiveLayer,
    setActiveWrapper,
  });

  const handleBlurCapture = useCallback(() => {
    let isLayerSet = activeLayerRef.current !== null;
    activeLayerRef.current = null;
    isLayerSet && notifyCommandUpdate();
  }, [notifyCommandUpdate]);

  let getComposingState = useGetComposingState();

  const handleKeyEvent = useCallback(
    (event) => {
      if (getComposingState(event)) return;
      flushSync(() => {
        let isCommandApplied = applyKeyCommand(
          event,
          activeLayerRef.current,
          activeWrapperRef.current,
          globalKeyCommandContext,
        );
        if (isCommandApplied) {
          const keyCommand = getKeyCommand(event);
          notifyCommandTriggered(keyCommand);
        }
      });
    },
    [getComposingState, globalKeyCommandContext, notifyCommandTriggered],
  );

  useGlobalEventListener('keydown', handleKeyEvent);
  useGlobalEventListener('keyup', handleKeyEvent);

  return jsx(CometKeyCommandUtilsContext.Provider, {
    value: keyCommandContextRef.current,
    children: jsx('div', {
      className: stylex(xstyle),
      onBlurCapture: handleBlurCapture,
      children: children,
    }),
  });
}
