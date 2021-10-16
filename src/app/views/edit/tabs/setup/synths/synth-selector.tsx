import _ from 'lodash';

import { useSynthesizers } from '../../../../../../state';
import * as Synthesizers from '../../../../../../synthesizers/synthesizers';
import { SynthesizerConfig } from '../../../../../../types';
import { ObjectSelect } from '../../../../../components';

interface Props {
  synthesizer: SynthesizerConfig;
  inUse: boolean;
}

export const SynthSelector = ({ synthesizer, inUse }: Props) => {
  const { updateSynthesizer } = useSynthesizers();

  const onChange = (selection: string) => {
    updateSynthesizer(synthesizer.id, { name: selection, expansionCards: {} });
  };

  return (
    <ObjectSelect
      disabled={inUse}
      options={Synthesizers.synthNames}
      render={_.identity}
      selected={synthesizer.name}
      setSelected={onChange}
    />
  );
};
