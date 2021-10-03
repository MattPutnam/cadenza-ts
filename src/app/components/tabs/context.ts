import React from 'react';

interface TabContextType {
  selectedTab: number;
  setSelectedTab: (newTab: number) => void;
}

export const TabContext = React.createContext({} as TabContextType);
