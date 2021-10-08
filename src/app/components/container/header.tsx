import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { HeaderButton } from '.';
import { ButtonLike, icon, Spacer } from '..';
import { IconName } from '../icons/icons';
import { ContainerContext } from './context';

interface Props {
  buttons?: [IconName, (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void][];
}

interface Collapsible {
  collapsed: boolean;
}

const Caret = styled(ButtonLike)<Collapsible>`
  flex: none;
  width: unset;
  align-self: center;
  cursor: pointer;
  margin-right: 0.5rem;
`;

const HeaderContainer = styled.div<Collapsible>`
  display: flex;
  align-items: baseline;
  align-self: stretch;
  padding: 0.5rem;
  border-bottom: ${({ collapsed }) => (collapsed ? undefined : '1px solid black')};
`;

export const Header: React.FC<Props> = ({ buttons, children }) => {
  const { collapse, collapsed, setCollapsed } = React.useContext(ContainerContext);

  return (
    <HeaderContainer collapsed={collapsed}>
      {collapse && (
        <Caret collapsed={collapsed} onClick={() => setCollapsed(!collapsed)}>
          {icon(collapsed ? 'collapsed' : 'expanded')}
        </Caret>
      )}
      {children}
      {!_.isEmpty(buttons) && <Spacer />}
      {!collapsed && (
        <>
          {buttons?.map(([iconName, onClick], index) => (
            <HeaderButton key={index} iconName={iconName} onClick={onClick} />
          ))}
        </>
      )}
    </HeaderContainer>
  );
};
