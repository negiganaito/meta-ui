import React, { useCallback, useMemo, useRef, useTransition } from 'react';
import { jsx } from 'react/jsx-runtime';
import { EntryPointContainer, useEntryPointLoader } from 'react-relay/hooks';
import { useCometPreloader } from '@meta-core/dialog/use-comet-preloader';
import { modernEnvironment } from '@meta-core/relay/environment';
import { useDeepEqualMemo } from '@meta-core/utils/use-deep-equal-memo';

const TIMEOUT_DURATION = 30000;

// eslint-disable-next-line max-params
export function useGeoEntryPointModal(
  entryPoint,
  props,
  entryPointParams,
  preloaderOptions = { preloadTriggerType: 'button' },
) {
  const { onBeforeHide, renderSuspenseFallback, ...modalProps } = props;

  // const relayEnvironment = useRelayEnvironment();

  const environmentProvider = useMemo(
    () => ({
      getEnvironment: () => modernEnvironment,
    }),
    [],
  );

  const memoizedParams = useDeepEqualMemo(entryPointParams);

  const [entryPointRef, loadEntryPoint, disposeEntryPoint] = useEntryPointLoader(environmentProvider, entryPoint);

  const timeoutRef = useRef(null);
  const isModalVisible = useRef(false);

  const clearModalTimeout = useCallback(() => {
    if (timeoutRef.current === null) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const setModalTimeout = useCallback(() => {
    if (isModalVisible.current) return;
    timeoutRef.current = setTimeout(() => {
      disposeEntryPoint();
    }, TIMEOUT_DURATION);
  }, [disposeEntryPoint]);

  const [isPending, startTransition] = useTransition();

  const showModal = useCallback(() => {
    startTransition(() => {
      clearModalTimeout();
      isModalVisible.current = true;
      loadEntryPoint(memoizedParams);
    });
  }, [clearModalTimeout, memoizedParams, loadEntryPoint, startTransition]);

  const hideModal = useCallback(() => {
    isModalVisible.current = false;
    disposeEntryPoint();
  }, [disposeEntryPoint]);

  const handleModalHide = useCallback(
    (event) => {
      if ((!onBeforeHide ? void 0 : onBeforeHide(event)) !== false) {
        hideModal();
      }
    },
    [hideModal, onBeforeHide],
  );

  const preloader = useCometPreloader(
    preloaderOptions.preloadTriggerType,
    () => {
      const cometRelayEFModule = CometRelayEF.getModuleIfRequireable();
      if (memoizedParams && cometRelayEFModule) {
        cometRelayEFModule.fetchPredictions(entryPoint, memoizedParams);
      }
      entryPoint.root.preload();
    },
    showModal,
    setModalTimeout,
  );

  const suspenseFallback = renderSuspenseFallback
    ? renderSuspenseFallback(hideModal)
    : jsx(GeoModalGlimmer, { onHide: handleModalHide });

  return {
    isLoading: isPending,
    showModal,
    hideModal,
    onHoverInPreloader: preloader.onHoverInPreloader,
    onHoverOutPreloader: preloader.onHoverOutPreloader,
    onHoverMovePreloader: preloader.onHoverMovePreloader,
    onPressInPreloader: preloader.onPressInPreloader,
    modal: entryPointRef
      ? jsx(React.Suspense, {
          fallback: suspenseFallback,
          children: React.jsx(EntryPointContainer, {
            entryPointReference: entryPointRef,
            props: { ...modalProps, onHide: handleModalHide },
          }),
        })
      : null,
  };
}
