import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { HeaderButton } from '.';
import { ButtonLike, icon, Spacer } from '..';
import { IconName } from '../icons/icons';
import { ContainerContext } from './context';

type MaybeAction = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;

interface Props {
  buttons?: ([IconName, MaybeAction, boolean?] | false | undefined)[];
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
          {buttons?.map((buttonSpec, index) => {
            if (buttonSpec) {
              const [iconName, onClick, disabled] = buttonSpec;
              return <HeaderButton key={index} iconName={iconName} onClick={onClick} disabled={disabled} />;
            } else {
              return undefined;
            }
          })}
        </>
      )}
    </HeaderContainer>
  );
};
