import React from 'react';

import _ from 'lodash';

import { useCues } from '../../../../../../state';
import { PatchUsage } from '../../../../../../types';
import { Container, ControlMapper, Header, Title } from '../../../../../components';
import { TriggerEditor } from '../trigger-editor';
import { CueLocationEditor } from './cue-location-editor';
import { PatchUsageDisplay } from './patch-usage/patch-usage-display';
import { PatchUsageEditor } from './patch-usage/patch-usage-editor';

export const CueEditor = ({ cueId, cloneSelf, deleteSelf }) => {
  const { cues, updateCue } = useCues();
  const [selectedPatchUsageIndex, setSelectedPatchUsageIndex] = React.useState<number | undefined>(undefined);

  const cue = _.find(cues, { id: cueId })!;
  const selectedPatchUsage =
    selectedPatchUsageIndex === undefined ? undefined : cue.patchUsages[selectedPatchUsageIndex];
  const setSelectedPatchUsage = (pu?: PatchUsage) =>
    setSelectedPatchUsageIndex(pu ? _.indexOf(cue.patchUsages, pu) : undefined);

  const deleteSelectedPatchUsage = () => {
    const patchUsages = [...cue.patchUsages];
    patchUsages.splice(selectedPatchUsageIndex!, 1);
    updateCue(cueId, { patchUsages });
    setSelectedPatchUsageIndex(undefined);
  };

  const addPatchUsage = (patchUsage: PatchUsage) => {
    const patchUsages = [...cue.patchUsages, patchUsage];
    updateCue(cueId, { patchUsages });
    setSelectedPatchUsageIndex(cue.patchUsages.length);
  };

  const setPatchUsage = (patchUsage: PatchUsage) => {
    const patchUsages = [...cue.patchUsages];
    patchUsages[selectedPatchUsageIndex!] = patchUsage;
    updateCue(cueId, { patchUsages });
  };

  const updateSelectedPatchUsage = (updates: Partial<PatchUsage>) => {
    const patchUsages = [...cue.patchUsages];
    const patchUsage = patchUsages[selectedPatchUsageIndex!];
    Object.assign(patchUsage, updates);
    updateCue(cueId, { patchUsages });
  };

  return (
    <Container marginCollapse="left">
      <Header
        buttons={[
          ['clone', cloneSelf],
          ['delete', deleteSelf]
        ]}
      >
        <Title>Edit Cue</Title>
      </Header>
      <CueLocationEditor key={`${cue.songId}#${cue.location.toString()}`} cueId={cueId} />
      <PatchUsageDisplay
        cue={cue}
        selectedPatchUsage={selectedPatchUsage}
        setSelectedPatchUsage={setSelectedPatchUsage}
        addPatchUsage={addPatchUsage}
      />
      {selectedPatchUsage && (
        <PatchUsageEditor
          patchUsage={selectedPatchUsage}
          deleteSelf={deleteSelectedPatchUsage}
          setPatchUsage={setPatchUsage}
          updatePatchUsage={updateSelectedPatchUsage}
        />
      )}
      {!selectedPatchUsage && (
        <TriggerEditor
          marginCollapse="top"
          triggers={cue.triggers}
          setTriggers={(triggers) => updateCue(cueId, { triggers })}
        />
      )}
      {!selectedPatchUsage && (
        <ControlMapper
          marginCollapse="top"
          alternate
          mapping={cue.mapping}
          setMapping={(mapping) => updateCue(cueId, { mapping })}
        />
      )}
    </Container>
  );
};
