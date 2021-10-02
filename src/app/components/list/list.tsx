import React from 'react';

import styled from 'styled-components';

import { ListContext } from './context';

interface ListProps<T> {
  selectedItem?: T;
  setSelectedItem: (t: T | undefined) => void;
}

const StyledDiv = styled.div`
  align-self: stretch;
  overflow-y: auto;
`;

export function List<T>({
  selectedItem,
  setSelectedItem,
  children
}: React.PropsWithChildren<ListProps<T>>): JSX.Element {
  const value = React.useMemo(
    () => ({
      selectedItem,
      setSelectedItem
    }),
    [selectedItem, setSelectedItem]
  );

  return (
    <ListContext.Provider value={value}>
      <StyledDiv>{children}</StyledDiv>
    </ListContext.Provider>
  );
}
