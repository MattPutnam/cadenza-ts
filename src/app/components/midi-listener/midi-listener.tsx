import React from 'react';

import { MidiMessage, addMidiListener, removeMidiListener, MidiFilter } from '../../../midi';

interface Props {
  dispatch: (msg: MidiMessage) => void;
  id: number | string;
  keyboardId?: number;
}

export const MidiListener: React.FC<Props> = ({ dispatch, id, keyboardId }) => {
  React.useEffect(() => {
    let filter: MidiFilter | undefined;
    if (keyboardId !== undefined) {
      filter = (msg: MidiMessage) => msg.keyboardId === keyboardId;
    }

    addMidiListener(dispatch, id, filter);
    return () => removeMidiListener(id);
  }, [dispatch, id, keyboardId]);

  return null;
};
