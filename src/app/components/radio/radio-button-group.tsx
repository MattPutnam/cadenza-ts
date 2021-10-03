import React, { useMemo } from 'react';

import { v4 as uuid } from 'uuid';

import { Flex } from '..';
import { indexChildren } from '../utils';
import { RadioContext } from './context';

interface RadioButtonGroupProps {
  selected: number;
  setSelected: (index: number) => void;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ selected, setSelected, children }) => {
  const groupName = uuid();

  const contextValue = useMemo(() => ({ selected, setSelected, groupName }), [selected, setSelected, groupName]);

  return (
    <RadioContext.Provider value={contextValue}>
      <Flex column>{indexChildren(children)}</Flex>
    </RadioContext.Provider>
  );
};
