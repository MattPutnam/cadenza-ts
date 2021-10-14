import React from 'react';

import _ from 'lodash';

import { AppContext } from '..';
import { SynthesizerConfig } from '../../types';

export const useSynthesizers = () => {
  const { synthesizers, setSynthesizers } = React.useContext(AppContext);

  const addSynthesizer = (newSynth: SynthesizerConfig) => setSynthesizers([...synthesizers, newSynth]);

  const deleteSynthesizer = (toDelete: SynthesizerConfig) => {
    const newValue = [...synthesizers];
    _.remove(newValue, { id: toDelete.id });
    setSynthesizers(newValue);
  };

  const updateSynthesizer = (id: number, newKeyboard: Partial<SynthesizerConfig>) => {
    const newValue = [...synthesizers];
    const index = _.findIndex(newValue, { id });
    newValue[index] = { ...newValue[index], ...newKeyboard };
    setSynthesizers(newValue);
  };

  return { synthesizers, setSynthesizers, addSynthesizer, deleteSynthesizer, updateSynthesizer };
};
