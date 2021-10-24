import _ from 'lodash';

import { TriggerInput } from '../../../../../../../types';
import { Container, Content, Header, Tabs, TabHeader, TabPanel, Title } from '../../../../../../components';
import { SectionWrapper } from '../section-wrapper';
import { ControlEditor } from './control-editor';
import { KeyPressEditor } from './key-press-editor';

interface Props {
  input: TriggerInput;
  setInput: (input: TriggerInput) => void;
  deleteSelf: () => void;
  moveUp?: () => void;
  moveDown?: () => void;
}

export const InputEditor = ({ input, setInput, deleteSelf, moveUp, moveDown }: Props) => {
  let selectedTab: number = 0;
  if (input.type === 'control') {
    selectedTab = 1;
  }

  const setSelectedTab = (index: number) => {
    if (index === 0) {
      setInput({ type: 'key-press' });
    } else if (index === 1) {
      setInput({ type: 'control', controller: 0, value: 127 });
    }
  };

  return (
    <SectionWrapper>
      <Container>
        <Header
          buttons={[
            ['arrowUp', moveUp],
            ['arrowDown', moveDown],
            ['delete', deleteSelf]
          ]}
        >
          <Title>Edit Input</Title>
        </Header>
        <Content>
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
            <TabHeader>Key Press</TabHeader>
            <TabHeader>Controller</TabHeader>
            <TabPanel>
              <KeyPressEditor input={input} setInput={setInput} />
            </TabPanel>
            <TabPanel>
              <ControlEditor input={input} setInput={setInput} />
            </TabPanel>
          </Tabs>
        </Content>
      </Container>
    </SectionWrapper>
  );
};
