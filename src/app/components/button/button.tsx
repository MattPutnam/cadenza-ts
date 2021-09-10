import React from 'react';

import styled from 'styled-components';

import { colors } from '../colors';

interface Props {
  large?: boolean;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
}

const ButtonComp = styled.button<Pick<Props, 'large' | 'disabled'>>`
  margin: ${(props) => (props.large ? '0 0 0 0.5rem' : '-2px 0 -2px 0.5rem')};
  padding: ${(props) => (props.large ? '0.5rem 0.75rem' : '2px 0.75rem')};
  color: ${(props) => (props.disabled ? colors.gray[4] : 'white')};
  background-color: ${(props) => (props.disabled ? colors.gray[2] : colors.blue[2])};
  font-size: 'unset';
  border: 1px solid ${(props) => (props.disabled ? colors.gray[2] : colors.blue[1])};
  border-radius: 3px;
  cursor: ${(props) => (props.disabled ? undefined : 'pointer')};
`;

export const Button: React.FC<Props> = ({ large, disabled, onClick, style, children }) => {
  return (
    <ButtonComp style={style} onClick={onClick} large={large} disabled={disabled}>
      {children}
    </ButtonComp>
  );
};
