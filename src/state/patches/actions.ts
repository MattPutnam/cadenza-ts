import { PatchSelection } from './../../types/data';

export type PatchesActions = {
  setPatches: (patches: PatchSelection[]) => void;
};
