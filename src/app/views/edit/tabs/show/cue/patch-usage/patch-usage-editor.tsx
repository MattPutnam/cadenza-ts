import _ from 'lodash';

import { usePatches } from '../../../../../../../state';
import { PatchUsage } from '../../../../../../../types';
import {
  Container,
  ControlMapper,
  ObjectSelect,
  TabHeader,
  TabPanel,
  Tabs,
  Transpose
} from '../../../../../../components';
import { GhostNotesEditor } from './ghost-notes-editor';
import { HarpPedalsEditor } from './harp-pedals-editor';
import { NormalEditor } from './normal-editor';
import { RangeSelector } from './range-selector';

interface Props {
  patchUsage: PatchUsage;
  setPatchUsage: (patchUsage: PatchUsage) => void;
  updatePatchUsage: (patchUsage: Partial<PatchUsage>) => void;
  deleteSelf: () => void;
}

export const PatchUsageEditor = ({ patchUsage, setPatchUsage, updatePatchUsage, deleteSelf }: Props) => {
  const { patches, findPatch } = usePatches();

  let selectedTab = 0;
  if (patchUsage.type === 'ghost-notes') {
    selectedTab = 1;
  } else if (patchUsage.type === 'harp-pedals') {
    selectedTab = 2;
  }

  const onTabSelected = (index: number) => {
    if (index === 0) {
      setPatchUsage({ ...patchUsage, type: 'normal', monophonic: false });
    } else if (index === 1) {
      setPatchUsage({ ...patchUsage, type: 'ghost-notes', mappedNotes: {}, passthrough: false });
    } else if (index === 2) {
      setPatchUsage({ ...patchUsage, type: 'harp-pedals', pedalPositions: [0, 0, 0, 0, 0, 0, 0] });
    }
  };

  return (
    <Container
      alternate
      collapse
      marginCollapse="top"
      header={{
        title: 'Configure',
        contents: (
          <ObjectSelect
            label="Patch:"
            options={patches}
            selected={findPatch(patchUsage.patchId)!}
            setSelected={(patch) => updatePatchUsage({ patchId: patch.id })}
            render={(p) => p.name}
          />
        ),
        buttons: [['delete', deleteSelf]]
      }}
    >
      <RangeSelector patchUsage={patchUsage} updatePatchUsage={updatePatchUsage} />
      <Container collapse header={{ title: 'Type' }}>
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
      <Transpose
        transposition={patchUsage.transposition}
        setTransposition={(transposition) => updatePatchUsage({ transposition })}
      />
      <ControlMapper mapping={patchUsage.mapping} setMapping={(mapping) => updatePatchUsage({ mapping })} />
    </Container>
  );
};
