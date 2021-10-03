import { Container } from '../container';
import { TabHeader } from './tab-header';
import { TabPanel } from './tab-panel';
import { Tabs as TabsComponent } from './tabs';

export default {
  title: 'Components / Tabs'
};

export const Tabs = () => {
  return (
    <Container>
      <TabsComponent>
        <TabHeader>Tab 1</TabHeader>
        <TabHeader>Tab 2</TabHeader>
        <TabHeader>Tab 3</TabHeader>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabsComponent>
    </Container>
  );
};
