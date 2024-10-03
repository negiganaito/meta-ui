import React, { useContext } from 'react';
import { DocumentTranslationStatusContext } from '@meta-ui/business/contexts';
import { useDocumentTranslationStatusObserver, uuidv4 } from '@meta-ui/core/utils';

function DocumentTranslationStatusProvider_({ children }) {
  const translationStatusObserver = useDocumentTranslationStatusObserver();
  return (
    <DocumentTranslationStatusContext.Provider value={translationStatusObserver}>
      {children}
    </DocumentTranslationStatusContext.Provider>
  );
}

function useTranslationKeyForTextParent() {
  const translationStatus = useContext(DocumentTranslationStatusContext);
  return translationStatus ? uuidv4() : undefined;
}

export const DocumentTranslationStatusProvider = {
  DocumentTranslationStatusProvider: DocumentTranslationStatusProvider_,
  useTranslationKeyForTextParent,
};
