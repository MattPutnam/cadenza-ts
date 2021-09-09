import _ from 'lodash';

export const midiInterfaceToName = (midiInterface: WebMidi.MIDIPort): string =>
  `${midiInterface.manufacturer} ${midiInterface.name}`;

export const findInterfaceByName = (interfaces: WebMidi.MIDIPort[], name: string): WebMidi.MIDIPort | undefined =>
  _.find(interfaces, (i) => midiInterfaceToName(i) === name);
