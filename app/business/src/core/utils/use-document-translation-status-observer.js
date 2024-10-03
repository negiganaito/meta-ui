import { useEffect, useState } from 'react';

export function useDocumentTranslationStatusObserver() {
  const [isTranslated, setIsTranslated] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (!htmlElement) {
      return;
    }

    const observer = new MutationObserver(() => {
      if (htmlElement.className.match('translated')) {
        setIsTranslated(true);
      } else {
        setIsTranslated(false);
      }
    });

    observer.observe(htmlElement, {
      attributeFilter: ['class'],
      attributes: true,
      characterData: false,
      childList: false,
    });

    if (htmlElement.className.match('translated')) {
      setIsTranslated(true);
    }

    return () => observer.disconnect();
  }, []);

  return isTranslated;
}
