import { useEffect } from 'react';

export const useDocumentListener = (eventType: string, listener: () => void) => {
  useEffect(() => {
    document.addEventListener(eventType, listener);
    return () => document.removeEventListener(eventType, listener);
  }, [eventType, listener]);
};
