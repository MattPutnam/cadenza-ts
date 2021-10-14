import { Ided } from './ided';
import { Mappable } from './mappable';
import { ClosedRange, OpenRange } from './range';

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

export interface PatchDefinition {
  synthesizerId: number;
  synthesizer: string;
  bank: string;
  number: number | [number, number];
  name: string;
}

export interface Bank {
  name: string;
  patches: PatchDefinition[];
}

export interface Patch extends PatchDefinition, Ided, Mappable {
  volume: number;
}

export interface Song extends Ided, Mappable {
  number: string;
  name: string;
}

export interface PatchUsage extends Mappable {
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
