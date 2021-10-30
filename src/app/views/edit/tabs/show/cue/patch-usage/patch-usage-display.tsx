import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import * as Midi from '../../../../../../../midi';
import { useKeyboards, usePatches } from '../../../../../../../state';
import { Cue, KeyboardDefinition, PatchUsage } from '../../../../../../../types';
import * as KeyboardUtils from '../../../../../../../utils/keyboard-utils';
import {
  ButtonLike,
  Center,
  colors,
  Container,
  Flex,
  KeyboardPanel,
  MidiListener,
  Placeholder,
  Spacer
} from '../../../../../../components';

interface Props {
  cue: Cue;
  selectedPatchUsage?: PatchUsage;
  setSelectedPatchUsage: (patchUsage?: PatchUsage) => void;
  addPatchUsage: (patchUsage: PatchUsage) => void;
}

export const PatchUsageDisplay = ({ cue, selectedPatchUsage, setSelectedPatchUsage, addPatchUsage }: Props) => {
  const { keyboards } = useKeyboards();
  const { patches } = usePatches();

  const [listening, setListening] = React.useState(false);
  const [savedNote, setSavedNote] = React.useState<{ keyboardId: number; note: number } | undefined>(undefined);

  const patchUsagesByKeyboardId = _.groupBy(cue.patchUsages, 'keyboardId');

  const createPatchUsage = React.useCallback(
    (keyboardId: number, low: number, high: number) => {
      const newPatchUsage: PatchUsage = {
        type: 'normal',
        keyboardId,
        patchId: patches[0].id,
        range: [low, high],
        mapping: {},
        transposition: 0,
        monophonic: false
      };

      addPatchUsage(newPatchUsage);
    },
    [addPatchUsage, patches]
  );

  const handleListeningClick = React.useCallback(() => {
    if (!listening) {
      setListening(true);
    } else {
      setSavedNote(undefined);
      setListening(false);
    }
  }, [listening]);

  const handleMidi = React.useCallback(
    (msg: Midi.MidiMessage) => {
      if (msg instanceof Midi.NoteOnMessage) {
        const { keyboardId, note } = msg;
        if (keyboardId !== undefined) {
          if (savedNote) {
            if (savedNote.keyboardId === keyboardId) {
              const [low, high] = [savedNote.note, note].sort();
              createPatchUsage(keyboardId, low, high);
              setSavedNote(undefined);
              setListening(false);
            } else {
              setSavedNote({ keyboardId, note });
            }
          } else {
            setSavedNote({ keyboardId, note });
          }
        }
      }
    },
    [createPatchUsage, savedNote]
  );

  return (
    <Container
      alternate
      collapse
      marginCollapse="top"
      header={{
        title: 'Drag a range of notes to add a patch',
        buttons: [[listening ? 'cancel' : 'ear', handleListeningClick]]
      }}
    >
      {listening && <MidiListener id="PatchUsageDisplay" dispatch={handleMidi} />}
      {_.isEmpty(keyboards) && <Placeholder height="50px">No keyboards defined</Placeholder>}
      {keyboards.map((keyboard) => {
        const patchUsages = patchUsagesByKeyboardId[keyboard.id] || [];
        const patchUsageRows = KeyboardUtils.groupIntoRows(patchUsages);
        return (
          <Center pad key={keyboard.id}>
            <Flex column align="stretch">
              <KeyboardPanel
                keyboard={keyboard}
                listenerId={`PatchUsageDisplay${keyboard.id}`}
                onKeyClick={(key) => createPatchUsage(keyboard.id, key, key)}
                onRangeDrag={([low, high]) => createPatchUsage(keyboard.id, low, high)}
              />
              {patchUsageRows.map((patchUsageRow, index) => {
                return (
                  <PatchUsageRow
                    key={index}
                    patchUsageRow={patchUsageRow}
                    keyboard={keyboard}
                    selectedPatchUsage={selectedPatchUsage}
                    setSelectedPatchUsage={setSelectedPatchUsage}
                  />
                );
              })}
            </Flex>
          </Center>
        );
      })}
    </Container>
  );
};

interface PatchUsageRowProps {
  patchUsageRow: PatchUsage[];
  keyboard: KeyboardDefinition;
  selectedPatchUsage?: PatchUsage;
  setSelectedPatchUsage: (patchUsage?: PatchUsage) => void;
}

const PatchUsageBar = styled(ButtonLike)<{ width: number; selected: boolean }>`
  flex: 0 0 ${({ width }) => width}px;
  padding: 0.25rem 1px;
  border: 1px solid black;
  text-align: center;
  background-color: ${({ selected }) => (selected ? colors.blue[2] : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const PatchUsageRow = ({ patchUsageRow, keyboard, selectedPatchUsage, setSelectedPatchUsage }: PatchUsageRowProps) => {
  const { findPatch } = usePatches();

  const tagged = patchUsageRow.map((patchUsage) => {
    return {
      patchUsage,
      ...KeyboardUtils.getDimensions(keyboard.range, patchUsage.range)
    };
  });

  let index = 0;
  let accum = 0;
  const elements: React.ReactNode[] = [];
  tagged.forEach(({ patchUsage, left, width }) => {
    let adjustedWidth = width;
    if (left > accum) {
      const diff = left - accum;
      elements.push(<Spacer key={index++} width={diff} />);
    } else if (left < accum) {
      adjustedWidth -= accum - left;
    }
    const { patchId } = patchUsage;
    const patch = findPatch(patchId);
    const selected = selectedPatchUsage === patchUsage;
    elements.push(
      <PatchUsageBar
        key={index++}
        width={adjustedWidth}
        selected={selected}
        onClick={() => setSelectedPatchUsage(selected ? undefined : patchUsage)}
      >
        {patch ? patch.name : 'No Patch Selected'}
      </PatchUsageBar>
    );
    accum = left + width;
  });

  return <Flex>{elements}</Flex>;
};
