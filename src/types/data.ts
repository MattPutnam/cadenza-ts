import { Ided } from './ided';
import { Mappable } from './mappable';
import { ClosedRange, OpenRange } from './range';
import { Transposeable } from './transposeable';

export type MIDIChannel = number;

export interface Keyboard extends Ided {
  range: ClosedRange;
  midiInterfaceName: string;
  channel: MIDIChannel;
}

export interface SynthesizerConfig extends Ided {
  name: string;
  expansionCards: Record<string, string>;
  midiInterfaceName: string;
  channels: MIDIChannel[];
}

export type ActionPedalType = 'single value' | 'alternating value' | 'continuous';
export const actionPedalTypes = ['single value', 'alternating value', 'continuous'] as ActionPedalType[];

export interface ActionPedal {
  keyboardId: number;
  controller: number;
  type: ActionPedalType;
  reverse: boolean;
}

export interface PatchAddress {
  synthesizer: string;
  bank: string;
  number: number | [number, number];
}

export interface PatchDefinition extends PatchAddress {
  synthesizerId: number;
  name: string;
}

export interface Bank {
  name: string;
  patches: PatchDefinition[];
}

export interface PatchSelection extends PatchDefinition, Ided, Mappable, Transposeable {
  volume: number;
}

export interface Song extends Ided, Mappable, Transposeable {
  number: string;
  name: string;
}

export interface PatchUsage extends Mappable, Transposeable {
  keyboardId: number;
  patchId: number;
  attributes: {
    type: string; // TODO
  };
  range: OpenRange;
}

export interface Trigger {
  inputs: any[]; // TODO
  type: 'any of' | 'all of' | 'all in sequence';
  actions: any[]; // TODO
}

export interface Cue extends Ided, Mappable {
  songId: number;
  measure: string;
  patchUsages: PatchUsage[];
  triggers: Trigger[];
}
