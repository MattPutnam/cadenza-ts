import React from 'react';

import _ from 'lodash';

import * as Midi from '../../../../../../midi';
import { KeyboardDefinition, Range } from '../../../../../../types';
import { Button, Message, MidiListener, ObjectSelect } from '../../../../../components';

const ENTER_CUSTOM = 'ENTER_CUSTOM';
const CUSTOM_RANGE = 'CUSTOM_RANGE';
const ENTER_CUSTOM_OPTION = { label: 'Enter Custom...', value: ENTER_CUSTOM };
const CUSTOM_OPTION = { label: 'Custom range', value: CUSTOM_RANGE };

type OptionValueType = Range | typeof ENTER_CUSTOM | typeof CUSTOM_RANGE;

const options: { label: string; value: Range }[] = [
  { label: '88 keys', value: [21, 108] },
  { label: '76 keys', value: [28, 103] },
  { label: '61 keys', value: [36, 96] },
  { label: '54 keys', value: [36, 89] },
  { label: '49 keys', value: [36, 84] },
  { label: '37 keys (low F)', value: [41, 77] },
  { label: '37 keys (low C)', value: [48, 84] },
  { label: '36 keys (low F)', value: [41, 76] },
  { label: '36 keys (low C)', value: [48, 83] },
  { label: '32 keys (low F)', value: [41, 72] },
  { label: '32 keys (low C)', value: [48, 79] },
  { label: '25 keys', value: [48, 72] }
];

const STAGE1 = 'Press leftmost key...';
const STAGE2 = 'Press rightmost key...';
type Stage = typeof STAGE1 | typeof STAGE2 | undefined;

interface Props {
  keyboard: KeyboardDefinition;
  setRange: (range: Range) => void;
}

export const KeyboardSizeSelector: React.FC<Props> = ({ keyboard, setRange }) => {
  const [stage, setStage] = React.useState<Stage>(undefined);
  const [leftNote, setLeftNote] = React.useState<number | undefined>(undefined);

  const handleChange = React.useCallback(
    (selection: OptionValueType) => {
      if (selection === ENTER_CUSTOM) {
        setStage(STAGE1);
      } else if (selection !== CUSTOM_RANGE) {
        setRange(selection);
      }
    },
    [setRange]
  );

  const cancelCustom = React.useCallback(() => {
    setStage(undefined);
    setLeftNote(undefined);
  }, []);

  const handleMidi = React.useCallback(
    (parsedMessage: Midi.MidiMessage) => {
      const { type } = parsedMessage;

      if (type === Midi.NOTE_ON) {
        const noteOn = parsedMessage as Midi.NoteOnMessage;
        if (stage === STAGE1) {
          setLeftNote(noteOn.note);
          setStage(STAGE2);
        } else if (stage === STAGE2) {
          const range = [leftNote!, noteOn.note].sort((a, b) => a - b) as Range;
          setRange(range);
          setStage(undefined);
          setLeftNote(undefined);
        }
      }
    },
    [leftNote, setRange, stage]
  );

  const selected = !!stage
    ? ENTER_CUSTOM_OPTION
    : _.find(options, (option) => _.isEqual(option.value, keyboard.range)) ?? CUSTOM_OPTION;

  return (
    <>
      {!stage && (
        <ObjectSelect
          options={[...options, ENTER_CUSTOM_OPTION, ...(selected === CUSTOM_OPTION ? [CUSTOM_OPTION] : [])]}
          render={(option) => option.label}
          selected={selected}
          setSelected={(selected) => handleChange(selected.value as OptionValueType)}
        />
      )}
      {!!stage && (
        <>
          <Message>{stage}</Message>
          <MidiListener id={`KSS${keyboard.id}`} dispatch={handleMidi} keyboardId={keyboard.id} />
          <Button large onClick={() => cancelCustom()}>
            Cancel
          </Button>
        </>
      )}
    </>
  );
};
