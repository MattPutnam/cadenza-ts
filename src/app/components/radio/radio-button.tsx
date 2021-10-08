import React from 'react';

import styled from 'styled-components';

import { Flex, Label } from '..';
import { useUUID } from '../../../hooks/use-uuid';
import { Indexed } from '../utils';
import { RadioContext } from './context';

const StyledInput = styled.input`
  cursor: pointer;
`;

export const RadioButton: React.FC<Indexed> = ({ index, children }) => {
  const id = useUUID()!;

  const { selected, setSelected, groupName } = React.useContext(RadioContext);

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
