import React, { useContext } from 'react';
import { DocumentTranslationStatusContext } from '@meta-business/contexts/document-translation-status-context';
import { useDocumentTranslationStatusObserver } from '@meta-core/utils/use-document-translation-status-observer';
import { uuidv4 } from '@meta-core/utils/uuidv4';

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
