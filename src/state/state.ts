import { Globals, KeyboardDefinition, ActionPedal, SynthesizerConfig, PatchSelection, Song, Cue } from '../types';

export type State = {
  globals: Globals;
  keyboards: KeyboardDefinition[];
  actionPedal?: ActionPedal;
  synthesizers: SynthesizerConfig[];
  patches: PatchSelection[];
  songs: Song[];
  cues: Cue[];
};
