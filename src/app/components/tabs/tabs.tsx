import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { Flex } from '..';
import { indexChildren } from '../utils';
import { TabContext } from './context';

const TabBar = styled(Flex)`
  border-bottom: 1px solid black;
`;

interface Props {
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}

export const Tabs: React.FC<Props> = ({ selectedTab, setSelectedTab, children }) => {
  const headers = _.filter(children as any, (child) => child.type?.name === 'TabHeader');
  const panels = _.filter(children as any, (child) => child.type?.name === 'TabPanel');

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      <TabBar>{indexChildren(headers)}</TabBar>
      {indexChildren(panels)}
    </TabContext.Provider>
  );
};
