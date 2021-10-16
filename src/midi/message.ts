import _ from 'lodash';

import { midiInterfaceToName, midiNoteNumberToName, shortCCName } from '.';
import { Keyboard } from '../types';

export const NOTE_OFF = 8 as const;
export const NOTE_ON = 9 as const;
export const KEY_AFTERTOUCH = 10 as const;
export const CONTROL = 11 as const;
export const PROGRAM_CHANGE = 12 as const;
export const CHANNEL_AFTERTOUCH = 13 as const;
export const PITCH_BEND = 14 as const;
export const UNKNOWN = 99 as const;

type field = number | string;

export abstract class MidiMessage {
  type: number;
  channel: number;
  midiInterfaceName: string;
  keyboardId?: number;

  constructor(type: number, channel: number, midiInterfaceName: string, keyboardId?: number) {
    this.type = type;
    this.channel = channel;
    this.midiInterfaceName = midiInterfaceName;
    this.keyboardId = keyboardId;
  }

  protected getStatus(): number {
    return (this.type << 4) | this.channel;
  }

  abstract unparse(): number[];

  protected abstract getFields(): [field, field];

  toString(): string {
    const channel = `CH${this.channel + 1}`.padEnd(4);
    const [f2, f3] = this.getFields();
    return `${channel} ${f2.toString().padStart(3).padEnd(5)} ${f3.toString().padEnd(3)}`;
  }
}

export class NoteOnMessage extends MidiMessage {
  note: number;
  velocity: number;

  constructor(note: number, velocity: number, channel: number, midiInterfaceName: string, keyboardId?: number) {
    super(NOTE_ON, channel, midiInterfaceName, keyboardId);
    this.note = note;
    this.velocity = velocity;
  }

  unparse(): number[] {
    return [this.getStatus(), this.note, this.velocity];
  }

  getFields(): [field, field] {
    return [midiNoteNumberToName(this.note), this.velocity];
  }
}

export class NoteOffMessage extends MidiMessage {
  note: number;

  constructor(note: number, channel: number, midiInterfaceName: string, keyboardId?: number) {
    super(NOTE_OFF, channel, midiInterfaceName, keyboardId);
    this.note = note;
  }

  unparse(): number[] {
    return [this.getStatus(), this.note, 0];
  }

  getFields(): [field, field] {
    return [midiNoteNumberToName(this.note), 'OFF'];
  }
}

export class ControllerMessage extends MidiMessage {
  controller: number;
  value: number;

  constructor(controller: number, value: number, channel: number, midiInterfaceName: string, keyboardId?: number) {
    super(CONTROL, channel, midiInterfaceName, keyboardId);
    this.controller = controller;
    this.value = value;
  }

  unparse(): number[] {
    return [this.getStatus(), this.controller, this.value];
  }

  getFields(): [field, field] {
    return [shortCCName(this.controller), this.value];
  }
}

export class ProgramChangeMessage extends MidiMessage {
  value: number;

  constructor(value: number, channel: number, midiInterfaceName: string, keyboardId?: number) {
    super(PROGRAM_CHANGE, channel, midiInterfaceName, keyboardId);
    this.value = value;
  }

  unparse(): number[] {
    return [this.getStatus(), this.value];
  }

  getFields(): [field, field] {
    return ['PC', this.value];
  }
}

export class PitchBendMessage extends MidiMessage {
  value: number;

  constructor(value: number, channel: number, midiInterfaceName: string, keyboardId?: number) {
    super(PITCH_BEND, channel, midiInterfaceName, keyboardId);
    this.value = value;
  }

  unparse(): number[] {
    return [this.getStatus(), 0, this.value];
  }

  getFields(): [field, field] {
    return ['BEND', this.value];
  }
}

export class UnknownMessage extends MidiMessage {
  byte1: number;
  byte2: number;

  constructor(byte1: number, byte2: number, channel: number, midiInterfaceName: string, keyboardId?: number) {
    super(UNKNOWN, channel, midiInterfaceName, keyboardId);
    this.byte1 = byte1;
    this.byte2 = byte2;
  }

  unparse(): number[] {
    return [this.getStatus(), this.byte1, this.byte2];
  }

  getFields(): [field, field] {
    return [this.byte1, this.byte2];
  }
}

const midiInterfaceIdToName: Record<string, string> = {};

export const parseMidiMessage = (rawMsg: WebMidi.MIDIMessageEvent, keyboards: Keyboard[]): MidiMessage | undefined => {
  if (!rawMsg) {
    return undefined;
  }

  const midiInterface = rawMsg.target as WebMidi.MIDIPort;
  if (!midiInterface) {
    return undefined;
  }

  const { data } = rawMsg;
  if (data.length !== 3) {
    return undefined;
  }

  const status = data[0];
  const byte1 = data[1];
  const byte2 = data[2];
  const command = status >> 4;
  const channel = status & 0xf;

  let midiInterfaceName = midiInterfaceIdToName[midiInterface.id];
  if (!midiInterfaceName) {
    midiInterfaceName = midiInterfaceToName(midiInterface);
    midiInterfaceIdToName[midiInterface.id] = midiInterfaceName;
  }

  const keyboard = _.find(keyboards, { midiInterfaceName, channel });

  if (command === NOTE_OFF || (command === NOTE_ON && byte2 === 0)) {
    return new NoteOffMessage(byte1, channel, midiInterfaceName, keyboard?.id);
  } else if (command === NOTE_ON) {
    return new NoteOnMessage(byte1, byte2, channel, midiInterfaceName, keyboard?.id);
  } else if (command === CONTROL) {
    return new ControllerMessage(byte1, byte2, channel, midiInterfaceName, keyboard?.id);
  } else if (command === PROGRAM_CHANGE) {
    return new ProgramChangeMessage(byte1, channel, midiInterfaceName, keyboard?.id);
  } else if (command === PITCH_BEND) {
    return new PitchBendMessage(byte2, channel, midiInterfaceName, keyboard?.id);
  } else {
    return new UnknownMessage(byte1, byte2, channel, midiInterfaceName, keyboard?.id);
  }
};

export const setVolumeMessage = (channel: number, volume: number): MidiMessage => {
  return controllerMessage(channel, 7, volume);
};

export const controllerMessage = (channel: number, controller: number, value: number): MidiMessage => {
  return new ControllerMessage(controller, value, channel, 'undefined');
};

export const programChangeMessage = (channel: number, program: number): MidiMessage => {
  return new ProgramChangeMessage(program, channel, 'undefined');
};
