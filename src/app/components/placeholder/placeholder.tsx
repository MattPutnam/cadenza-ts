import React from 'react';

import styled from 'styled-components';

import { Flex } from '..';

interface Props {
  width?: string | number;
  height?: string | number;
}

const StyledFlex = styled(Flex)<Props>`
  justify-content: center;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  padding: 1rem;
`;

export const Placeholder: React.FC<Props> = ({ children, height = '100%', width = '100%' }) => {
  return (
    <StyledFlex align="center" height={height} width={width}>
      {children}
    </StyledFlex>
  );
};
