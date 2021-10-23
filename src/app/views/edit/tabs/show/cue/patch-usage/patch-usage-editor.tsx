import _ from 'lodash';

import { GhostNotesPatchUsage, HarpPedalsPatchUsage, NormalPatchUsage, PatchUsage } from '../../../../../../../types';
import {
  Container,
  Content,
  ControlMapper,
  Header,
  TabHeader,
  TabPanel,
  Tabs,
  Title
} from '../../../../../../components';
import { GhostNotesEditor } from './ghost-notes-editor';
import { HarpPedalsEditor } from './harp-pedals-editor';
import { NormalEditor } from './normal-editor';
import { PatchSelector } from './patch-selector';
import { RangeSelector } from './range-selector';

interface Props {
  patchUsage: PatchUsage;
  setPatchUsage: (patchUsage: PatchUsage) => void;
  updatePatchUsage: (patchUsage: Partial<PatchUsage>) => void;
  deleteSelf: () => void;
}

export const PatchUsageEditor = ({ patchUsage, setPatchUsage, updatePatchUsage, deleteSelf }: Props) => {
  let selectedTab = 0;
  if (patchUsage instanceof GhostNotesPatchUsage) {
    selectedTab = 1;
  } else if (patchUsage instanceof HarpPedalsPatchUsage) {
    selectedTab = 2;
  }

  const onTabSelected = (index: number) => {
    if (index === 0) {
      setPatchUsage(
        new NormalPatchUsage(
          patchUsage.keyboardId,
          patchUsage.patchId,
          patchUsage.range,
          patchUsage.mapping,
          patchUsage.transposition,
          false
        )
      );
    } else if (index === 1) {
      setPatchUsage(
        new GhostNotesPatchUsage(
          patchUsage.keyboardId,
          patchUsage.patchId,
          patchUsage.range,
          patchUsage.mapping,
          patchUsage.transposition,
          {},
          false
        )
      );
    } else if (index === 2) {
      setPatchUsage(
        new HarpPedalsPatchUsage(
          patchUsage.keyboardId,
          patchUsage.patchId,
          patchUsage.range,
          patchUsage.mapping,
          patchUsage.transposition,
          [0, 0, 0, 0, 0, 0, 0]
        )
      );
    }
  };

  return (
    <Container alternate collapse marginCollapse="top">
      <Header buttons={[['delete', deleteSelf]]}>
        <Title>Configure Patch</Title>
      </Header>
      <Content>
        <PatchSelector patchUsage={patchUsage} updatePatchUsage={updatePatchUsage} />
        <RangeSelector patchUsage={patchUsage} updatePatchUsage={updatePatchUsage} />
        <Container collapse>
          <Header>
            <Title>Type</Title>
          </Header>
          <Tabs selectedTab={selectedTab} setSelectedTab={onTabSelected}>
            <TabHeader>Normal</TabHeader>
            <TabHeader>Ghost Notes</TabHeader>
            <TabHeader>Harp Pedals</TabHeader>
            <TabPanel>
              <NormalEditor patchUsage={patchUsage} setPatchUsage={setPatchUsage} />
            </TabPanel>
            <TabPanel>
              <GhostNotesEditor patchUsage={patchUsage} setPatchUsage={setPatchUsage} />
            </TabPanel>
            <TabPanel>
              <HarpPedalsEditor patchUsage={patchUsage} setPatchUsage={setPatchUsage} />
            </TabPanel>
          </Tabs>
        </Container>
        <ControlMapper mapping={patchUsage.mapping} setMapping={(mapping) => updatePatchUsage({ mapping })} />
      </Content>
    </Container>
  );
};
