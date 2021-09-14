import React, { useContext } from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { ButtonLike, icon, Spacer } from '..';
import { ContainerContext } from './context';
import { HeaderButton } from './header-button';

interface Props {
  buttons?: typeof HeaderButton[];
}

const Caret = styled(ButtonLike)`
  width: unset;
  align-self: center;
  cursor: pointer;
  margin-right: 0.5rem;
`;

const HeaderContainer = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: baseline;
  align-self: 'stretch';
  padding: '0.5rem';
  border-bottom: ${({ collapsed }) => (collapsed ? undefined : '1px solid black')};
`;

export const Header: React.FC<Props> = ({ buttons, children }) => {
  const { collapse, collapsed, setCollapsed } = useContext(ContainerContext);

  return (
    <HeaderContainer collapsed={collapsed}>
      {collapse && collapsed && <Caret onClick={() => setCollapsed(false)}>{icon('collapsed')}</Caret>}
      {collapse && !collapsed && <Caret onClick={() => setCollapsed(true)}>{icon('expanded')}</Caret>}
      {children}
      {!_.isEmpty(buttons) && <Spacer />}
      {!collapsed && buttons}
    </HeaderContainer>
  );
};
