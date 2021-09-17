import React, { useMemo } from 'react';

import { v4 as uuid } from 'uuid';

import { Flex } from '..';
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
      <Flex column>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              index
            });
          }
        })}
      </Flex>
    </RadioContext.Provider>
  );
};
