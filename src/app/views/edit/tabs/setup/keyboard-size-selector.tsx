import React from 'react';

import * as Midi from '../../../../../midi';
import { Keyboard, ClosedRange } from '../../../../../types';
import { Button, Message, MidiListener } from '../../../../components';

const CUSTOM = 'CUSTOM';

const options: { label: String; value: [Number, number] | string }[] = [
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
  { label: '25 keys', value: [48, 72] },
  { label: 'Custom...', value: CUSTOM }
];

const STAGE1 = 'Press leftmost key...';
const STAGE2 = 'Press rightmost key...';
type Stage = typeof STAGE1 | typeof STAGE2 | undefined;

interface Props {
  keyboard: Keyboard;
  setRange: (range: ClosedRange) => void;
}

export const KeyboardSizeSelector: React.FC<Props> = ({ keyboard, setRange }) => {
  const [stage, setStage] = React.useState<Stage>(undefined);
  const [leftNote, setLeftNote] = React.useState<number | undefined>(undefined);

  const isCustomRange = React.useMemo(
    () => !options.map((opt) => opt.value.toString()).includes(keyboard.range.toString()),
    [keyboard.range]
  );

  const handleChange = React.useCallback(
    (selection: string) => {
      if (selection === CUSTOM) {
        setStage(STAGE1);
      } else {
        const range = selection.split(',').map((n) => parseInt(n, 10));
        setRange({ lowNote: range[0], highNote: range[1] });
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
      console.log(parsedMessage);

      if (type === Midi.NOTE_ON) {
        const noteOn = parsedMessage as Midi.NoteOnMessage;
        if (stage === STAGE1) {
          setLeftNote(noteOn.note);
          setStage(STAGE2);
        } else if (stage === STAGE2) {
          const range = [leftNote!, noteOn.note].sort((a, b) => a - b);
          setRange({ lowNote: range[0], highNote: range[1] });
          setStage(undefined);
          setLeftNote(undefined);
        }
      }
    },
    [leftNote, setRange, stage]
  );

  return (
    <>
      <select value={keyboard.range.toString()} onChange={(e) => handleChange(e.target.value)}>
        {options.map(({ label, value }, index) => (
          <option key={index} value={value.toString()}>
            {label}
          </option>
        ))}
        {isCustomRange && <option value={keyboard.range.toString()}>Custom Range</option>}
      </select>
      {!!stage && (
        <>
          <Message>{stage}</Message>
          <MidiListener id={`KSS${keyboard.id}`} dispatch={handleMidi} keyboard={keyboard} />
          <Button large onClick={() => cancelCustom()}>
            Cancel
          </Button>
        </>
      )}
    </>
  );
};
