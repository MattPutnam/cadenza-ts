import React from 'react';

import styled from 'styled-components';

interface Props {
  htmlFor: string;
  style?: React.CSSProperties;
}

const LabelWrapper = styled.label`
  margin-right: 0.5rem;
`;

export const Label: React.FC<Props> = ({ htmlFor, style, children }) => (
  <LabelWrapper htmlFor={htmlFor} style={style}>
    {children}
  </LabelWrapper>
);
