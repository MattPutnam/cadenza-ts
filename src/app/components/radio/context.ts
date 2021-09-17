import React from 'react';

interface RadioContextType {
  selected: number;
  setSelected: (value: number) => void;
  groupName: string;
}

export const RadioContext = React.createContext<RadioContextType>({
  selected: 0,
  setSelected: () => {},
  groupName: ''
});
