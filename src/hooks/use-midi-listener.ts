import { useEffect } from 'react';

import { addMidiListener, MidiFilter, MidiListener, MidiMessage, removeMidiListener } from '../midi';

export const useMidiListener = (dispatch: MidiListener, listenerId?: number | string, keyboardId?: number) => {
  useEffect(() => {
    if (listenerId) {
      let filter: MidiFilter | undefined;
      if (keyboardId !== undefined) {
        filter = (msg: MidiMessage) => msg.keyboardId === keyboardId;
      }

      addMidiListener(dispatch, listenerId, filter);
      return () => removeMidiListener(listenerId);
    }
  }, [dispatch, listenerId, keyboardId]);
};
