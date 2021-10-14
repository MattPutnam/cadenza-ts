import React from 'react';

import { useSynthesizers } from '../../../../../../state';
import * as Synthesizers from '../../../../../../synthesizers/synthesizers';
import { SynthesizerConfig } from '../../../../../../types';

interface Props {
  synthesizer: SynthesizerConfig;
  inUse: boolean;
}

export const SynthSelector = ({ synthesizer, inUse }: Props) => {
  const { updateSynthesizer } = useSynthesizers();

  const onChange = (selection: string) => {
    updateSynthesizer(synthesizer.id, { name: selection, expansionCards: {} });
  };

  // TODO: select
  return (
    <select value={synthesizer.name} disabled={inUse} onChange={(e) => onChange(e.target.value)}>
      {Synthesizers.synthNames.map((synthName) => (
        <option key={synthName} value={synthName}>
          {synthName}
        </option>
      ))}
    </select>
  );
};
