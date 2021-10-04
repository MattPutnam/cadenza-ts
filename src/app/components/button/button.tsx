import React from 'react';

import styled from 'styled-components';

import { colors } from '../colors';

interface Props {
  large?: boolean;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
}

const StyledButton = styled.button<Pick<Props, 'large' | 'disabled'>>`
  margin: ${({ large }) => (large ? '0 0 0 0.5rem' : '-2px 0 -2px 0.5rem')};
  padding: ${({ large }) => (large ? '0.5rem 0.75rem' : '2px 0.75rem')};
  background-color: ${({ disabled }) => (disabled ? colors.gray[2] : colors.blue[2])};
  color: inherit;
  font-size: 'unset';
  border: 1px solid ${({ disabled }) => (disabled ? colors.gray[2] : colors.blue[1])};
  border-radius: 3px;
  cursor: ${({ disabled }) => (disabled ? undefined : 'pointer')};
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${colors.blue[3]};
  }
`;

export const Button: React.FC<Props> = ({ large, disabled, onClick, style, children }) => {
  return (
    <StyledButton style={style} onClick={onClick} large={large} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
