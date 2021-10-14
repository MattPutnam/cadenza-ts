import { Keyboard, ActionPedal, SynthesizerConfig } from '../types';

export type State = {
  keyboards: Keyboard[];
  actionPedal?: ActionPedal;
  synthesizers: SynthesizerConfig[];
};
