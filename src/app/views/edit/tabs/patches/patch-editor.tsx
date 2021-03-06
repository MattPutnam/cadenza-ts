import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import * as Midi from '../../../../../midi';
import { usePatches, useSynthesizers } from '../../../../../state';
import { PatchSelection } from '../../../../../types';
import * as SynthUtils from '../../../../../utils/synth-utils';
import {
  Container,
  ControlMapper,
  Flex,
  PatchPicker,
  PatchTreeSelection,
  Transpose,
  Warning
} from '../../../../components';
import { PatchPerformer } from '../../../../performers';
import { PatchNamer } from './patch-namer';
import { Volume } from './volume';

const AllControls = styled(Flex)`
  height: 100%;
`;

const NotVolume = styled(Flex)`
  height: 100%;
  flex: 1 1 auto;
`;

interface Props {
  selectedPatchId: number;
  setSelectedPatchId: (id?: number) => void;
}

export const PatchEditor = ({ selectedPatchId, setSelectedPatchId }: Props) => {
  const { patches, createPatch, findPatch, deletePatch, updatePatch, isInUse } = usePatches();
  const { synthesizers, findSynthesizer } = useSynthesizers();
  const midiInterfaces = Midi.useMidiInterfaces();

  const { allPatches } = SynthUtils.resolveSynthesizersAndPatches(synthesizers);

  const selectedPatch = findPatch(selectedPatchId)!;
  const selectedSynth = findSynthesizer(selectedPatch.synthesizerId)!;
  const outputDevice = Midi.findInterfaceByName(midiInterfaces.outputs, selectedSynth.midiInterfaceName);

  const initialSelection = [
    selectedSynth ? selectedSynth.name : synthesizers[0].name,
    selectedPatch ? selectedPatch.bank : undefined,
    selectedPatch ? selectedPatch.number : undefined
  ] as PatchTreeSelection;

  const onPatchSelected = ([selectedSynthName, selectedBankName, selectedNumber]: [
    string,
    string,
    number | [number, number]
  ]) => {
    const clone: Partial<PatchSelection> = {
      synthesizerId: _.find(synthesizers, { name: selectedSynthName })!.id,
      bank: selectedBankName,
      number: selectedNumber
    };

    if (_.isEmpty(selectedPatch.name)) {
      const patch = _.find(allPatches, _.pick(selectedPatch, ['synthesizerId', 'bank', 'number']))!;
      clone.name = patch.name;
    }

    updatePatch(selectedPatchId, clone);
  };

  const deleteSelectedPatch = () => {
    deletePatch(selectedPatch.id);
    setSelectedPatchId(undefined);
  };

  const cloneSelectedPatch = () => {
    const match = /(.*)\s\(\d+\)/.exec(selectedPatch.name);
    const baseName = match ? match[1] : selectedPatch.name;
    let nameNumber = 0;
    let name = '';
    const allNames = new Set(_.map(patches, 'name'));
    do {
      nameNumber++;
      name = `${baseName} (${nameNumber})`;
    } while (allNames.has(name));

    const newPatch = _.cloneDeep(selectedPatch);
    newPatch.name = name;

    const newId = createPatch(newPatch);
    setSelectedPatchId(newId);
  };

  return (
    <Container
      marginCollapse="left"
      header={{
        title: 'Edit',
        buttons: [
          ['clone', cloneSelectedPatch],
          ['delete', deleteSelectedPatch, isInUse(selectedPatchId)]
        ]
      }}
    >
      <PatchPerformer patch={selectedPatch} />
      <AllControls>
        <NotVolume column>
          <Container
            alternate
            header={{ title: 'Assignment', contents: !outputDevice && <Warning>Interface not found</Warning> }}
          >
            <PatchPicker initialSelection={initialSelection} onPatchSelected={onPatchSelected} />
          </Container>
          <PatchNamer patch={selectedPatch} />
          <Transpose
            marginCollapse="top"
            alternate
            transposition={selectedPatch.transposition}
            setTransposition={(transposition) => updatePatch(selectedPatch.id, { transposition })}
          />
          <ControlMapper
            marginCollapse="top"
            alternate
            mapping={selectedPatch.mapping}
            setMapping={(mapping) => updatePatch(selectedPatch.id, { mapping })}
          />
        </NotVolume>
        <Volume patch={selectedPatch} />
      </AllControls>
    </Container>
  );
};
