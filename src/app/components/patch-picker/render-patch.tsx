import React from 'react';

import styled from 'styled-components';

import { Flex } from '..';
import { SynthTreeBank, SynthTreePatch } from '../../../utils/synth-utils';

const StyledFlex = styled(Flex)`
  width: 100%;
`;

const Name = styled.span`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Number = styled.span`
  flex: 0 0 auto;
  margin-left: 0.5rem;
`;

export const renderPatch = (bank: SynthTreeBank, patch: SynthTreePatch): JSX.Element => {
  let patchNumber: string | number;
  if (bank.name === 'GM2') {
    const [b1, b2] = patch.number as [number, number];
    patchNumber = `${b1 + 1}.${b2 + 1}`;
  } else {
    patchNumber = (patch.number as number) + (bank.index === undefined ? 1 : bank.index);
  }

  return (
    <StyledFlex>
      <Name>{patch.name}</Name>
      <Number>{patchNumber}</Number>
    </StyledFlex>
  );
};
