import React from 'react';

import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

import { Button, colors } from '..';

interface Props {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const StyledButton = styled(Button)`
  background-color: ${colors.gray[1]};
  border: 1px solid ${colors.gray[0]};
  margin: -0px.5rem 0 -0.5rem 0.5rem;
`;

export const HeaderButton: React.FC<Props> = ({ icon, onClick }) => (
  <StyledButton onClick={onClick}>{React.createElement(icon)}</StyledButton>
);
