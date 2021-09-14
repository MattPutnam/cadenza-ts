import React from 'react';

import styled from 'styled-components';

import { Button, colors } from '..';
import { icon, IconName } from '../icons/icons';

interface Props {
  iconName: IconName;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const StyledButton = styled(Button)`
  background-color: ${colors.gray[1]};
  border: 1px solid ${colors.gray[0]};
  margin: -0px.5rem 0 -0.5rem 0.5rem;
`;

export const HeaderButton: React.FC<Props> = ({ iconName, onClick }) => (
  <StyledButton onClick={onClick}>{icon(iconName)}</StyledButton>
);

export const headerButton = (
  iconName: IconName,
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
) => <HeaderButton iconName={iconName} onClick={onClick} />;
