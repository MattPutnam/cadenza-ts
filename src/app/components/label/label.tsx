import React from 'react';

import styled from 'styled-components';

interface Props {
  htmlFor: string;
  className?: string;
}

const LabelWrapper = styled.label`
  margin-right: 0.5rem;
`;

export const Label: React.FC<Props> = ({ htmlFor, className, children }) => (
  <LabelWrapper htmlFor={htmlFor} className={className}>
    {children}
  </LabelWrapper>
);
