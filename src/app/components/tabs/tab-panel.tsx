import React, { useContext } from 'react';

import styled from 'styled-components';

import { Indexed, select, Selectable } from '../utils';
import { TabContext } from './context';

const Container = styled.div<Selectable>`
  display: ${select('contents', 'none')};
`;

export const TabPanel: React.FC<Indexed> = ({ index, children }) => {
  const { selectedTab } = useContext(TabContext);

  return <Container selected={selectedTab === index}>{children}</Container>;
};
