import React from 'react';

interface CollapseContextType {
  collapse?: boolean;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export const ContainerContext = React.createContext<CollapseContextType>({
  collapse: false,
  collapsed: false,
  setCollapsed: () => {}
});
