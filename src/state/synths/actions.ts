import { SynthesizerConfig } from '../../types';

export type SynthesizerActions = {
  setSynthesizers: (newSynthesizers: SynthesizerConfig[]) => void;
};
