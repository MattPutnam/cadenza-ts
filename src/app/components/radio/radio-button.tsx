import React, { useContext } from 'react';

import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { Flex, Label } from '..';
import { Indexed } from '../utils';
import { RadioContext } from './context';

const StyledInput = styled.input`
  cursor: pointer;
`;

export const RadioButton: React.FC<Indexed> = ({ index, children }) => {
  const id = uuid();

  const { selected, setSelected, groupName } = useContext(RadioContext);

  return (
    <Flex pad>
      <StyledInput
        type="radio"
        id={id}
        name={groupName}
        onChange={() => setSelected(index!)}
        checked={index === selected}
      />
      <Label htmlFor={id}>{children}</Label>
    </Flex>
  );
};
