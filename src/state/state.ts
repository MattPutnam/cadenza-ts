import { Keyboard, ActionPedal } from '../types';

export type State = {
  keyboards: Keyboard[];
  actionPedal?: ActionPedal;
};
