import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { Flex } from '..';
import { indexChildren } from '../utils';
import { TabContext } from './context';

const TabBar = styled(Flex)`
  border-bottom: 1px solid black;
`;

export const Tabs = ({ children }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const headers = _.filter(children, (child) => child.type?.name === 'TabHeader');
  const panels = _.filter(children, (child) => child.type?.name === 'TabPanel');

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      <TabBar>{indexChildren(headers)}</TabBar>
      {indexChildren(panels)}
    </TabContext.Provider>
  );
};
