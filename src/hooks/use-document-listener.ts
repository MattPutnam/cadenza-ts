import { useEffect } from 'react';

export const useDocumentListener = (listener: () => void, eventType: string) => {
  useEffect(() => {
    document.addEventListener(eventType, listener);
    return () => document.removeEventListener(eventType, listener);
  }, [eventType, listener]);
};