import React from 'react';

import * as Midi from '../../../../../midi';
import { Warning } from '../../../../components';

export const MidiInterfacePlaceholder = "I'll connect later";

interface Props {
  forIO: 'inputs' | 'outputs';
  hardware: {
    id: number;
    midiInterfaceName: string;
  };
  setMidiInterfaceName: (name: string) => void;
}

export const InterfaceSelector = ({ forIO, hardware, setMidiInterfaceName }: Props) => {
  const midiInterfaces = Midi.useMidiInterfaces();

  const id = `${forIO}SelectorFor${hardware.id}`;
  const selected = hardware.midiInterfaceName;
  const values = midiInterfaces[forIO].map(Midi.midiInterfaceToName);
  const missing = selected !== MidiInterfacePlaceholder && !values.includes(selected);

  return (
    <>
      <label htmlFor={id}>Interface: </label>
      <select
        id={id}
        value={selected}
        onChange={(e) => {
          setMidiInterfaceName(e.target.value);
        }}
      >
        <option value={MidiInterfacePlaceholder}>{MidiInterfacePlaceholder}</option>
        {midiInterfaces[forIO].map((midiInterface: WebMidi.MIDIPort) => {
          const label = Midi.midiInterfaceToName(midiInterface);
          return (
            <option key={midiInterface.id} value={label}>
              {label}
            </option>
          );
        })}
        {missing && <option value={selected}>{selected}</option>}
      </select>
      {missing && <Warning>Interface not found</Warning>}
    </>
  );
};
