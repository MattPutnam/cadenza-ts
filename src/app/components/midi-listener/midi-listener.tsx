import React from 'react';

import { MidiMessage, addMidiListener, removeMidiListener, MidiFilter } from '../../../midi';
import { Keyboard } from '../../../types';

interface Props {
  dispatch: (msg: MidiMessage) => void;
  id: number | string;
  keyboard?: Keyboard;
}

export const MidiListener: React.FC<Props> = ({ dispatch, id, keyboard }) => {
  React.useEffect(() => {
    let filter: MidiFilter | undefined;
    if (keyboard !== undefined) {
      filter = (msg: MidiMessage) =>
        msg.midiInterfaceName === keyboard.midiInterfaceName && msg.channel === keyboard.channel;
    }

    addMidiListener(dispatch, id, filter);
    return () => removeMidiListener(id);
  }, [dispatch, id, keyboard]);

  return null;
};
