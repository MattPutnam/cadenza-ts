import { PatchSelection } from './../../types';

export type PatchesActions = {
  setPatches: (patches: PatchSelection[]) => void;
};
