import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { ButtonLike, colors, Spacer } from '..';
import { icon, IconName } from '../icons/icons';
import { HeaderButton } from './header-button';

type CollapsedState = {
  collapsed: boolean;
};

type CollapseProps = {
  collapse?: boolean;
  startCollapsed?: boolean;
};

type MaybeAction = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;

export type ContainerProps = {
  flex?: string | number;
  alternate?: boolean;
  marginCollapse?: 'top' | 'left';
  header?: {
    title?: string;
    contents?: React.ReactNode;
    buttons?: ([IconName, MaybeAction, boolean?] | false | undefined)[];
    showButtonsOnCollapsed?: boolean;
  };
};

const StyledSection = styled.section<ContainerProps & CollapsedState>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-self: 'stretch';
  flex: ${({ collapsed, flex }) => (collapsed ? 'none' : flex ? flex : '1 1 auto')};
  align-self: stretch;
  background-color: ${({ alternate }) => (alternate ? colors.gray[3] : colors.gray[2])};
  border: 1px solid black;
  margin: 0.5rem;
  margin-left: ${({ marginCollapse }) => (marginCollapse === 'left' ? 0 : undefined)};
  margin-top: ${({ marginCollapse }) => (marginCollapse === 'top' ? 0 : undefined)};
  border-radius: 3px;
  overflow: hidden;
`;

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

const Title = styled.span`
  font-weight: bold;
`;

const ContentContainer = styled.div<{ collapsed: boolean }>`
  display: ${({ collapsed }) => (collapsed ? 'none' : undefined)};
  flex: 1 1 auto;
  overflow: auto;
`;

type Props = React.HTMLAttributes<HTMLDivElement> & ContainerProps & CollapseProps;

export const Container: React.FC<Props> = ({
  alternate,
  collapse,
  startCollapsed,
  flex,
  marginCollapse,
  header,
  children,
  ...props
}) => {
  const [collapsed, setCollapsed] = React.useState(!!startCollapsed);

  return (
    <StyledSection collapsed={collapsed} flex={flex} alternate={alternate} marginCollapse={marginCollapse} {...props}>
      {header && (
        <HeaderContainer collapsed={collapsed}>
          {collapse && (
            <Caret collapsed={collapsed} onClick={() => setCollapsed(!collapsed)}>
              {icon(collapsed ? 'collapsed' : 'expanded')}
            </Caret>
          )}
          {header.title && <Title>{header.title}</Title>}
          {header.contents}
          {!_.isEmpty(header.buttons) && <Spacer />}
          {(!collapsed || header.showButtonsOnCollapsed) && (
            <>
              {header.buttons?.map((buttonSpec, index) => {
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
      )}
      <ContentContainer collapsed={collapsed}>{children}</ContentContainer>
    </StyledSection>
  );
};
