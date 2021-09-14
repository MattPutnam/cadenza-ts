import React from 'react';

import styled from 'styled-components';

import { colors } from '../colors';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
}

const ButtonWrapper = styled.button`
  color: inherit;
  background-color: inherit;
  text-align: inherit;
  align-items: inherit;
  margin: 0px;
  padding: 0px;
  border: none;
  font: inherit;
  cursor: inherit;
  width: 100%;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${colors.blue[3]};
  }
`;

export const ButtonLike = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<Props>>(
  ({ style, children, ...props }, ref) => (
    <ButtonWrapper ref={ref} style={style} {...props}>
      {children}
    </ButtonWrapper>
  )
);

ButtonLike.displayName = 'ButtonLike';
