import { KeyboardDefinition } from '../../types';

export type KeyboardActions = {
  setKeyboards: (newKeyboards: KeyboardDefinition[]) => void;
};
