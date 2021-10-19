import { Ided } from './ided';
import { HasLocation } from './location';
import { Mappable } from './mappable';
import { ClosedRange, OpenRange } from './range';
import { Transposeable } from './transposeable';

export type MIDIChannel = number;

export interface KeyboardDefinition extends Ided {
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

export interface PatchSelection extends PatchDefinition, Ided, Mappable, Transposeable {
  volume: number;
}

export interface Song extends HasLocation, Ided, Mappable, Transposeable {
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

export interface Cue extends HasLocation, Ided, Mappable {
  songId: number;
  patchUsages: PatchUsage[];
  triggers: Trigger[];
}
