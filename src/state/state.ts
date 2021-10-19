import { KeyboardDefinition, ActionPedal, SynthesizerConfig, PatchSelection, Song } from '../types';

export type State = {
  keyboards: KeyboardDefinition[];
  actionPedal?: ActionPedal;
  synthesizers: SynthesizerConfig[];
  patches: PatchSelection[];
  songs: Song[];
};
