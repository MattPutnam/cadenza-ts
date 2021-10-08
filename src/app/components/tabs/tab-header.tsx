import React from 'react';

import styled from 'styled-components';

import { ButtonLike, colors } from '..';
import { Indexed, select, Selectable } from '../utils';
import { TabContext } from './context';

const StyledTab = styled(ButtonLike)<Selectable>`
  flex: 0 0 150px;
  padding: 0.5rem 0.75rem;
  background-color: ${select(colors.blue[2])};
  cursor: pointer;
  border-right: 1px solid black;
  &:focus {
    z-index: 1;
  }
`;

export const TabHeader: React.FC<Indexed> = ({ index, children }) => {
  const { selectedTab, setSelectedTab } = React.useContext(TabContext);

  return (
    <StyledTab selected={index === selectedTab} onClick={() => setSelectedTab(index!)}>
      {children}
    </StyledTab>
  );
};
