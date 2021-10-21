import React from 'react';

import styled from 'styled-components';

interface Props {
  htmlFor?: string;
  className?: string;
}

const StyledLabel = styled.label`
  margin-right: 0.5rem;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 0.5rem;
  }
`;

export const Label: React.FC<Props> = ({ htmlFor, className, children }) => (
  <StyledLabel htmlFor={htmlFor} className={className}>
    {children}
  </StyledLabel>
);
