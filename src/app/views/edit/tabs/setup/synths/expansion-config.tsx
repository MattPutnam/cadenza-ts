import React from 'react';

import _ from 'lodash';

import { usePatches, useSynthesizers } from '../../../../../../state';
import * as Expansions from '../../../../../../synthesizers/expansions';
import * as Synthesizers from '../../../../../../synthesizers/synthesizers';
import { ExpansionDefinition, SynthesizerConfig } from '../../../../../../types';

interface ExpansionConfigProps {
  synthesizer: SynthesizerConfig;
}

export const ExpansionConfig = ({ synthesizer }: ExpansionConfigProps) => {
  const synthDefinition = Synthesizers.getSynthByName(synthesizer.name);

  return (
    <table>
      <tbody>
        {synthDefinition.expansions.map((expansionSlot) => {
          return (
            <tr key={expansionSlot.name}>
              <td>{expansionSlot.name}:</td>
              <td>
                <ExpansionSelector synthesizer={synthesizer} expansionSlot={expansionSlot} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

interface ExpansionSelectorProps {
  synthesizer: SynthesizerConfig;
  expansionSlot: ExpansionDefinition;
}

const ExpansionSelector = ({ synthesizer, expansionSlot }: ExpansionSelectorProps) => {
  const { updateSynthesizer } = useSynthesizers();
  const { patches } = usePatches();

  const options = Expansions.expansionsOfType(expansionSlot.type);
  const value = synthesizer.expansionCards[expansionSlot.name];

  const onChange = (selection: string) => {
    updateSynthesizer(synthesizer.id, {
      expansionCards: { ...synthesizer.expansionCards, [expansionSlot.name]: selection }
    });
  };

  const inUse = _.some(patches, { synthesizerId: synthesizer.id, bank: expansionSlot.name });

  // TODO: select
  return (
    <select disabled={inUse} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value={undefined}>None</option>
      {options.map((option) => {
        return <option key={option.number} value={option.number}>{`${option.number} ${option.name}`}</option>;
      })}
    </select>
  );
};
