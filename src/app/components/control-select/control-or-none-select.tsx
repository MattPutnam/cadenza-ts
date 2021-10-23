import React from 'react';

import _ from 'lodash';

import { Select } from '..';
import * as Midi from '../../../midi';
import { MaybeController } from '../../../types';

interface Props {
  selected: MaybeController;
  setSelected: (value: MaybeController) => void;
}

const options = _.range(-1, 128);

const render = (number: number) => {
  if (number === -1) {
    return 'None (Disable)';
  } else {
    return Midi.longCCName(number);
  }
};

export const ControlOrNoneSelect: React.FC<Props> = ({ selected, setSelected }) => {
  const wrappedSetSelected = React.useCallback(
    (value: number) => {
      if (value === -1) {
        setSelected('none');
      } else {
        setSelected(value);
      }
    },
    [setSelected]
  );

  // Unfortunately, Typescript isn't smart enough to see <number | 'none'> as a subtype of <number | string>,
  // hence the wrapping to translate 'none' to -1
  return (
    <Select
      options={options}
      selected={selected === 'none' ? -1 : (selected as number)}
      setSelected={wrappedSetSelected}
      render={render}
    />
  );
};
