import { useSongs } from '../../../../../../../state';
import {
  GotoTriggerAction,
  LocationNumber,
  PanicTriggerAction,
  StepTriggerAction,
  TriggerAction,
  WaitTriggerAction
} from '../../../../../../../types';
import {
  Container,
  Content,
  Header,
  Placeholder,
  TabHeader,
  TabPanel,
  Tabs,
  Title
} from '../../../../../../components';
import { SectionWrapper } from '../section-wrapper';
import { CueStepEditor } from './cue-step-editor';
import { GotoEditor } from './goto-editor';
import { WaitEditor } from './wait-editor';

interface Props {
  action: TriggerAction;
  setAction: (action: TriggerAction) => void;
  deleteSelf: () => void;
  moveUp?: () => void;
  moveDown?: () => void;
}

export const ActionEditor = ({ action, setAction, deleteSelf, moveUp, moveDown }: Props) => {
  const { songs } = useSongs();

  let selectedTab: number = 0;
  if (action instanceof GotoTriggerAction) {
    selectedTab = 1;
  } else if (action instanceof WaitTriggerAction) {
    selectedTab = 2;
  }

  const setSelectedTab = (index: number) => {
    if (index === 0) {
      setAction(new StepTriggerAction());
    } else if (index === 1) {
      setAction(new GotoTriggerAction(songs[0]?.id || 0, new LocationNumber(1, '')));
    } else if (index === 2) {
      setAction(new WaitTriggerAction(1000));
    } else if (index === 3) {
      setAction(new PanicTriggerAction());
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
          <Title>Edit Action</Title>
        </Header>
        <Content>
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
            <TabHeader>Cue Step</TabHeader>
            <TabHeader>Go to Location</TabHeader>
            <TabHeader>Wait</TabHeader>
            <TabHeader>Panic</TabHeader>
            <TabPanel>
              <CueStepEditor action={action} setAction={setAction} />
            </TabPanel>
            <TabPanel>
              <GotoEditor action={action} setAction={setAction} />
            </TabPanel>
            <TabPanel>
              <WaitEditor action={action} setAction={setAction} />
            </TabPanel>
            <TabPanel>
              <Placeholder>Panic (all notes off)</Placeholder>
            </TabPanel>
          </Tabs>
        </Content>
      </Container>
    </SectionWrapper>
  );
};
