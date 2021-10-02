import React from 'react';

export interface ListContextType<T> {
  selectedItem?: T;
  setSelectedItem: (t?: T) => void;
}

export const ListContext = React.createContext({} as ListContextType<any>);
