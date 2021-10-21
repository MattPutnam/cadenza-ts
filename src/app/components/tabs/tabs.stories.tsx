import React from 'react';

import { noControls } from '../../../storybook-components';
import { Container } from '../container';
import { TabHeader } from './tab-header';
import { TabPanel } from './tab-panel';
import { Tabs } from './tabs';

export default {
  title: 'Components / Tabs'
};

export const TabsStory = noControls(() => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  return (
    <Container>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
        <TabHeader>Tab 1</TabHeader>
        <TabHeader>Tab 2</TabHeader>
        <TabHeader>Tab 3</TabHeader>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </Tabs>
    </Container>
  );
});
TabsStory.storyName = 'Tabs';
