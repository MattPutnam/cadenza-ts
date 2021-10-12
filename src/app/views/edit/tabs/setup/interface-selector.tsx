import * as Midi from '../../../../../midi';
import { Select, Warning } from '../../../../components';

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

  // const id = `${forIO}SelectorFor${hardware.id}`;
  const selected = hardware.midiInterfaceName;
  const values = midiInterfaces[forIO].map(Midi.midiInterfaceToName);
  const missing = selected !== MidiInterfacePlaceholder && !values.includes(selected);

  return (
    <>
      <Select
        style={{ marginRight: '0.5rem' }}
        label="Interface:"
        options={[MidiInterfacePlaceholder, ...values, ...(missing ? [selected] : [])]}
        selected={selected}
        setSelected={setMidiInterfaceName}
      />
      {missing && <Warning>Interface not found</Warning>}
    </>
  );
};
