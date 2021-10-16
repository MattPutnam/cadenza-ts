import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { colors } from '..';
import { ContainerContext } from './context';

type CollapsedState = {
  collapsed: boolean;
};

type CollapseProps = {
  collapse?: boolean;
  startCollapsed?: boolean;
};

export type ContainerProps = {
  flex?: string | number;
  alternate?: boolean;
  marginCollapse?: 'top' | 'left';
};

type Props = React.HTMLAttributes<HTMLDivElement> & ContainerProps & CollapseProps;

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

export const Container: React.FC<Props> = ({
  alternate,
  collapse,
  startCollapsed,
  flex,
  marginCollapse,
  children,
  ...props
}) => {
  const [collapsed, setCollapsed] = React.useState(!!startCollapsed);

  const contextValue = React.useMemo(
    () => ({
      collapse,
      collapsed,
      setCollapsed
    }),
    [collapse, collapsed]
  );

  return (
    <ContainerContext.Provider value={contextValue}>
      <StyledSection collapsed={collapsed} flex={flex} alternate={alternate} marginCollapse={marginCollapse} {...props}>
        {children}
      </StyledSection>
    </ContainerContext.Provider>
  );
};
