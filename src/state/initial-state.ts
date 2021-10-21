import { State } from './state';

export const initialState: State = {
  globals: {
    transposition: 0,
    triggers: [],
    mapping: {}
  },
  keyboards: [],
  actionPedal: undefined,
  synthesizers: [],
  patches: [],
  songs: [],
  cues: []
};
