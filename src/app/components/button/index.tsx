import React from 'react';
import { colors } from '../colors';

interface Props {
  large?: boolean;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
}

export const Button: React.FC<Props> = ({
  large,
  disabled,
  onClick,
  style,
  children
}) => {
  const myStyle: React.CSSProperties = {
    margin: large ? '0 0 0 0.5rem' : '-2px 0 -2px 0.5rem',
    padding: large ? '0.5rem 0.75rem' : '2px 0.75rem',
    color: disabled ? colors.gray[4] : 'white',
    backgroundColor: disabled ? colors.gray[2] : colors.blue[2],
    fontSize: 'unset',
    border: `1px solid ${disabled ? colors.gray[2] : colors.blue[1]}`,
    borderRadius: 3,
    cursor: disabled ? undefined : 'pointer',
    ...style
  };

  return (
    <button disabled={disabled} style={myStyle} onClick={onClick}>
      {children}
    </button>
  );
};
