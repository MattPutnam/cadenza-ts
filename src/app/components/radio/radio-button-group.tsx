import React from 'react';

import { Flex } from '..';
import { useUUID } from '../../../hooks/use-uuid';
import { indexChildren } from '../utils';
import { RadioContext } from './context';

interface RadioButtonGroupProps {
  selected: number;
  setSelected: (index: number) => void;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ selected, setSelected, children }) => {
  const groupName = useUUID()!;
  const contextValue = React.useMemo(() => ({ selected, setSelected, groupName }), [selected, setSelected, groupName]);

  return (
    <RadioContext.Provider value={contextValue}>
      <Flex column>{indexChildren(children)}</Flex>
    </RadioContext.Provider>
  );
};
