import { Keyboard, ActionPedal, SynthesizerConfig, PatchSelection } from '../types';

export type State = {
  keyboards: Keyboard[];
  actionPedal?: ActionPedal;
  synthesizers: SynthesizerConfig[];
  patches: PatchSelection[];
};
