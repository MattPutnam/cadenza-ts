import React from 'react';

import styled from 'styled-components';

interface Props {
  htmlFor?: string;
  className?: string;
}

const StyledLabel = styled.label<{ point: boolean }>`
  margin-right: 0.5rem;
  cursor: ${({ point }) => (point ? 'pointer' : undefined)};
  &:not(:first-child) {
    margin-left: 0.5rem;
  }
`;

export const Label: React.FC<Props> = ({ htmlFor, className, children }) => (
  <StyledLabel point={!!htmlFor} htmlFor={htmlFor} className={className}>
    {children}
  </StyledLabel>
);
