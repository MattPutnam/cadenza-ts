import React from 'react';

import styled from 'styled-components';

import { Flex } from '..';
import { ToggleContext } from './context';

interface Props {
  selectedIndex: number;
  setSelectedIndex: (newValue: number) => void;
}

const ToggleContainer = styled(Flex)`
  display: inline-flex;
`;

export const Toggle: React.FC<Props> = ({ selectedIndex, setSelectedIndex, children }) => {
  const contextValue = React.useMemo(() => ({ selectedIndex, setSelectedIndex }), [selectedIndex, setSelectedIndex]);
  const numChildren = React.Children.count(children);

  return (
    <ToggleContainer>
      <ToggleContext.Provider value={contextValue}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { index, first: index === 0, last: index === numChildren - 1 });
          }
        })}
      </ToggleContext.Provider>
    </ToggleContainer>
  );
};
