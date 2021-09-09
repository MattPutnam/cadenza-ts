import { MidiMessage } from '.';

export type MidiListener = (msg: MidiMessage) => void;

export type MidiFilter = (msg: MidiMessage) => boolean;

const listeners: Record<string | number, { listener: MidiListener; filter?: MidiFilter }> = {};

export const addMidiListener = (listener: MidiListener, id: string | number, filter?: MidiFilter): void => {
  listeners[id] = { listener, filter };
};

export const removeMidiListener = (id: string | number): void => {
  delete listeners[id];
};

export const notifyMidiListeners = (msg: MidiMessage): void => {
  Object.values(listeners).forEach(({ listener, filter }) => {
    if (!filter || filter(msg)) {
      listener(msg);
    }
  });
};
