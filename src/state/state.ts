import { KeyboardDefinition, ActionPedal, SynthesizerConfig, PatchSelection } from '../types';

export type State = {
  keyboards: KeyboardDefinition[];
  actionPedal?: ActionPedal;
  synthesizers: SynthesizerConfig[];
  patches: PatchSelection[];
};
