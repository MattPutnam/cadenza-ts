import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import * as Midi from '../../../../../midi';
import { useCues, usePatches, useSynthesizers } from '../../../../../state';
import { PatchSelection } from '../../../../../types';
import * as SynthUtils from '../../../../../utils/synth-utils';
import {
  Container,
  Content,
  ControlMapper,
  Flex,
  Header,
  MidiListener,
  PatchPicker,
  PatchTreeSelection,
  Title,
  Transpose,
  Warning
} from '../../../../components';
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
  const { patches, createPatch, findPatch, deletePatch, updatePatch } = usePatches();
  const { synthesizers, findSynthesizer } = useSynthesizers();
  const { cues } = useCues();
  const midiInterfaces = Midi.useMidiInterfaces();

  const { allPatches } = SynthUtils.resolveSynthesizersAndPatches(synthesizers);

  const selectedPatch = findPatch(selectedPatchId)!;
  const patchAssigned =
    selectedPatch.synthesizerId !== undefined && selectedPatch.bank && selectedPatch.number !== undefined;
  const selectedSynth = findSynthesizer(selectedPatch.synthesizerId)!;
  const outputDevice = Midi.findInterfaceByName(midiInterfaces.outputs, selectedSynth.midiInterfaceName) as
    | WebMidi.MIDIOutput
    | undefined;
  const channelToUse = selectedSynth.channels[0];

  const initialSelection = [
    selectedSynth ? selectedSynth.name : synthesizers[0].name,
    selectedPatch ? selectedPatch.bank : undefined,
    selectedPatch ? selectedPatch.number : undefined
  ] as PatchTreeSelection;

  const deleteDisabled = _.some(cues, (cue) => {
    return _.some(cue.patchUsages, (patchUsage) => {
      return patchUsage.patchId === selectedPatchId;
    });
  });

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

  React.useEffect(() => {
    if (outputDevice && patchAssigned) {
      SynthUtils.loadPatch(selectedPatch, selectedSynth, channelToUse, outputDevice);
    }
  }, [
    outputDevice,
    selectedPatch,
    selectedPatch.bank,
    selectedPatch.number,
    selectedSynth,
    channelToUse,
    patchAssigned
  ]);

  React.useEffect(() => {
    if (outputDevice && patchAssigned) {
      outputDevice.send(Midi.setVolumeMessage(channelToUse, selectedPatch.volume).unparse());
    }
  }, [outputDevice, channelToUse, selectedPatch.volume, patchAssigned]);

  const handleMidi = (parsedMessage: Midi.MidiMessage) => {
    if (patchAssigned && outputDevice) {
      const { transposition, mapping } = selectedPatch;

      if (
        transposition &&
        (parsedMessage instanceof Midi.NoteOnMessage || parsedMessage instanceof Midi.NoteOffMessage)
      ) {
        parsedMessage.note = parsedMessage.note + transposition;
      }

      if (mapping && parsedMessage instanceof Midi.ControllerMessage) {
        const mapped = mapping[parsedMessage.controller];
        if (mapped && mapped !== 'none') {
          parsedMessage.controller = mapped;
        }
      }

      parsedMessage.channel = channelToUse;
      outputDevice.send(parsedMessage.unparse());
    }
  };

  return (
    <Container marginCollapse="left">
      <Header
        buttons={[
          ['clone', cloneSelectedPatch],
          ['delete', deleteSelectedPatch, deleteDisabled]
        ]}
      >
        <Title>Edit</Title>
      </Header>
      <Content>
        {outputDevice && <MidiListener id={`PatchEditor#${selectedPatchId}`} dispatch={handleMidi} />}
        <AllControls>
          <NotVolume column>
            <Container alternate>
              <Header>
                <Title>Assignment</Title>
                {!outputDevice && <Warning>Interface not found</Warning>}
              </Header>
              <Content>
                <PatchPicker initialSelection={initialSelection} onPatchSelected={onPatchSelected} />
              </Content>
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
      </Content>
    </Container>
  );
};
