import React from 'react';

interface ToggleContextType {
  selectedIndex: number;
  setSelectedIndex: (value: number) => void;
}

export const ToggleContext = React.createContext<ToggleContextType>({
  selectedIndex: 0,
  setSelectedIndex: () => {}
});
