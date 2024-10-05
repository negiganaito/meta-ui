import React, { useCallback, useState } from 'react';
import { GeoPrivateModalContext } from '@meta-business/contexts/geo-private-modal-context';
import { ErrorBoundary } from '@meta-core/error/error-boundary';
import { FBLogger } from '@meta-core/error/fb-logger';
import { useIsMountedRef } from '@meta-core/hooks/use-is-mounted-ref';

export function GeoTransientModalProvider({ children, onModalError }) {
  const isMountedRef = useIsMountedRef();
  const [modals, setModals] = useState([]);

  const addModal = useCallback((modal, modalProps, onHide) => {
    setModals((currentModals) =>
      currentModals.concat({
        modal,
        modalProps,
        onHide,
      }),
    );
  }, []);

  const removeModal = useCallback(
    (modalConfig, reason) => {
      if (!isMountedRef.current) return;
      setModals((currentModals) => {
        const index = currentModals.indexOf(modalConfig);
        if (index === -1) {
          FBLogger('geodesic_web')
            .blameToPreviousFrame()
            .mustfix('Attempting to close a dialog that does not exist anymore.');
          return currentModals;
        }
        return currentModals.slice(0, index);
      });
      if (modalConfig.onHide) {
        modalConfig.onHide(reason);
      }
    },
    [isMountedRef],
  );

  return (
    <GeoPrivateModalContext.Provider value={addModal}>
      {children}
      {modals.map((modalConfig, index) => (
        <ModalRenderer
          key={index}
          modalConfig={modalConfig}
          onModalError={onModalError}
          removeModalConfig={removeModal}
        />
      ))}
    </GeoPrivateModalContext.Provider>
  );
}

function ModalRenderer({ modalConfig, onModalError, removeModalConfig }) {
  const { modal: ModalComponent, modalProps } = modalConfig;

  const handleHide = useCallback(
    (reason) => {
      removeModalConfig(modalConfig, reason);
    },
    [modalConfig, removeModalConfig],
  );

  const handleError = useCallback(
    (error, errorInfo) => {
      handleHide('layerHideButton');
      if (onModalError) {
        onModalError(error, errorInfo);
      }
    },
    [handleHide, onModalError],
  );

  return (
    <ErrorBoundary onError={handleError}>
      <ModalComponent {...modalProps} onHide={handleHide} />
    </ErrorBoundary>
  );
}
