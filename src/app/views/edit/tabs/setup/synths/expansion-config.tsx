import _ from 'lodash';

import { usePatches, useSynthesizers } from '../../../../../../state';
import * as Expansions from '../../../../../../synthesizers/expansions';
import * as Synthesizers from '../../../../../../synthesizers/synthesizers';
import { ExpansionDefinition, SynthesizerConfig, ExpansionCard } from '../../../../../../types';
import { ObjectSelect } from '../../../../../components';

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

const noneOption: ExpansionCard = { name: 'None', number: '', patches: [] };

const ExpansionSelector = ({ synthesizer, expansionSlot }: ExpansionSelectorProps) => {
  const { updateSynthesizer } = useSynthesizers();
  const { patches } = usePatches();

  const options = [noneOption, ...Expansions.expansionsOfType(expansionSlot.type)];
  const value = _.find(options, { number: synthesizer.expansionCards[expansionSlot.name] }) ?? noneOption;

  return (
    <ObjectSelect
      disabled={_.some(patches, { synthesizerId: synthesizer.id, bank: expansionSlot.name })}
      options={options}
      render={(expansionCard) => `${expansionCard.number} ${expansionCard.name}`}
      selected={value}
      setSelected={(expansionCard) => {
        const newExpansionCards = { ...synthesizer.expansionCards };
        if (expansionCard.number) {
          newExpansionCards[expansionSlot.name] = expansionCard.number;
        } else {
          delete newExpansionCards[expansionSlot.name];
        }
        updateSynthesizer(synthesizer.id, { expansionCards: newExpansionCards });
      }}
    />
  );
};
