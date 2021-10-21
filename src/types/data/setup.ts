import { ClosedRange, Ided } from '..';

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
