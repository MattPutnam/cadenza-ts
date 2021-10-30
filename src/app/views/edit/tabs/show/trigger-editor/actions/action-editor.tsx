import { useSongs } from '../../../../../../../state';
import { TriggerAction } from '../../../../../../../types';
import { Container, Placeholder, TabHeader, TabPanel, Tabs } from '../../../../../../components';
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
  if (action.type === 'goto') {
    selectedTab = 1;
  } else if (action.type === 'wait') {
    selectedTab = 2;
  } else if (action.type === 'panic') {
    selectedTab = 3;
  }

  const setSelectedTab = (index: number) => {
    if (index === 0) {
      setAction({ type: 'step', reverse: false });
    } else if (index === 1) {
      setAction({ type: 'goto', songId: songs[0]?.id ?? -1, measure: { numberPart: 1 } });
    } else if (index === 2) {
      setAction({ type: 'wait', millis: 500 });
    } else if (index === 3) {
      setAction({ type: 'panic' });
    }
  };

  return (
    <SectionWrapper>
      <Container
        header={{
          title: 'Edit Action',
          buttons: [
            ['arrowUp', moveUp],
            ['arrowDown', moveDown],
            ['delete', deleteSelf]
          ]
        }}
      >
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
      </Container>
    </SectionWrapper>
  );
};
