import React from 'react';

import _ from 'lodash';

import { parseMidiMessage, notifyMidiListeners } from '..';
import { useKeyboards } from '../../state';
import { KeyboardDefinition } from '../../types';

type Input = WebMidi.MIDIInput;
type Output = WebMidi.MIDIOutput;

interface MidiInterfaceContextType {
  inputs: Input[];
  outputs: Output[];
}

const MidiInterfaceContext = React.createContext({} as MidiInterfaceContextType);

// The main useEffect can only be run once, so each MIDI input's onmidimessage
// can only be assigned once. Hence that function cannot be recomputed, and to
// get access to the keyboard list that function needs to reference a mutable
// yet external cache of the keyboards.
let cache: KeyboardDefinition[] = [];
const setKeyboards = (keyboards: KeyboardDefinition[]) => (cache = keyboards);
const getKeyboards = () => cache;

export const MidiInterfaceProvider: React.FC = ({ children }) => {
  const [inputs, setInputs] = React.useState([] as Input[]);
  const [outputs, setOutputs] = React.useState([] as Output[]);

  const { keyboards } = useKeyboards();
  React.useEffect(() => {
    setKeyboards(keyboards);
  }, [keyboards]);

  const onMidiMessage = React.useCallback((message: WebMidi.MIDIMessageEvent) => {
    const parsed = parseMidiMessage(message, getKeyboards());
    if (parsed) {
      notifyMidiListeners(parsed);
    }
  }, []);

  React.useEffect(() => {
    navigator.requestMIDIAccess().then((access) => {
      access.onstatechange = ({ port }) => {
        const { type, state, id } = port;
        if (type === 'input') {
          const input = port as Input;
          if (state === 'connected') {
            if (!inputs.some((input) => input.id === id)) {
              input.onmidimessage = onMidiMessage;
              setInputs([...inputs, input]);
            }
          } else {
            input.onmidimessage = () => {};
            setInputs(_.filter(inputs, (input) => input.id !== id));
          }
        } else {
          const output = port as Output;
          if (state === 'connected') {
            if (!outputs.some((output) => output.id === id)) {
              setOutputs([...outputs, output]);
            }
          } else {
            setOutputs(_.filter(outputs, (output) => output.id !== id));
          }
        }
      };

      const inputIterator = access.inputs.values();
      let inputItem = inputIterator.next();
      const inputs: WebMidi.MIDIInput[] = [];
      while (!inputItem.done) {
        const input = inputItem.value;
        input.onmidimessage = onMidiMessage;
        inputs.push(input);
        inputItem = inputIterator.next();
      }

      setInputs(inputs);

      const outputIterator = access.outputs.values();
      let outputItem = outputIterator.next();
      const outputs: WebMidi.MIDIOutput[] = [];
      while (!outputItem.done) {
        outputs.push(outputItem.value);
        outputItem = outputIterator.next();
      }

      setOutputs(outputs);
    });

    return () => {
      navigator.requestMIDIAccess().then((access) => {
        access.onstatechange = () => {};
      });
      inputs.forEach((input) => (input.onmidimessage = () => {}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MidiInterfaceContext.Provider value={{ inputs, outputs }}>{children}</MidiInterfaceContext.Provider>;
};

export const useMidiInterfaces = () => {
  return React.useContext(MidiInterfaceContext);
};
