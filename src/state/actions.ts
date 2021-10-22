import { State } from './state';

export type BaseActions = {
  setState: (state: Partial<State>) => void;
};
