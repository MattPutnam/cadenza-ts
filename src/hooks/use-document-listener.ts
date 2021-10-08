import React from 'react';

export const useDocumentListener = (eventType: string, listener: () => void) => {
  React.useEffect(() => {
    document.addEventListener(eventType, listener);
    return () => document.removeEventListener(eventType, listener);
  }, [eventType, listener]);
};
