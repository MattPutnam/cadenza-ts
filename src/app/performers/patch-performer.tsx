import React from 'react';

import {
  ControllerMessage,
  findInterfaceByName,
  MidiMessage,
  NoteOffMessage,
  NoteOnMessage,
  setVolumeMessage,
  useMidiInterfaces
} from '../../midi';
import { useSynthesizers } from '../../state';
import { PatchSelection } from '../../types';
import * as SynthUtils from '../../utils/synth-utils';
import { MidiListener } from '../components';

interface Props {
  patch: PatchSelection;
}

export const PatchPerformer = ({ patch }: Props) => {
  const { findSynthesizer } = useSynthesizers();
  const { outputs } = useMidiInterfaces();

  const synthesizer = findSynthesizer(patch.synthesizerId);
  const channel = synthesizer?.channels[0];
  const device =
    synthesizer && (findInterfaceByName(outputs, synthesizer.midiInterfaceName) as WebMidi.MIDIOutput | undefined);

  React.useEffect(() => {
    if (device) {
      SynthUtils.loadPatch(patch, synthesizer!, channel!, device);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patch.synthesizerId, patch.bank, patch.number, outputs]);

  React.useEffect(() => {
    if (device) {
      device.send(setVolumeMessage(channel!, patch.volume).unparse());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patch.volume, outputs]);

  const handleMidi = (parsedMessage: MidiMessage) => {
    if (device) {
      const { transposition, mapping } = patch;

      if (transposition && (parsedMessage instanceof NoteOnMessage || parsedMessage instanceof NoteOffMessage)) {
        parsedMessage.note = parsedMessage.note + transposition;
      }

      if (mapping && parsedMessage instanceof ControllerMessage) {
        const mapped = mapping[parsedMessage.controller];
        if (mapped && mapped !== 'none') {
          parsedMessage.controller = mapped;
        }
      }

      parsedMessage.channel = channel!;
      device.send(parsedMessage.unparse());
    }
  };

  return <MidiListener id="PatchPerformer" dispatch={handleMidi} />;
};
