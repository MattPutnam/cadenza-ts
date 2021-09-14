import React, { useContext } from 'react';

import styled from 'styled-components';

import { ContainerContext } from './context';

const ContentContainer = styled.div<{ collapsed: boolean }>`
  display: ${({ collapsed }) => (collapsed ? 'none' : undefined)};
  flex: 1 1 auto;
  overflow: auto;
`;

export const Content: React.FC = ({ children }) => {
  const { collapsed } = useContext(ContainerContext);

  return <ContentContainer collapsed={collapsed}>{children}</ContentContainer>;
};
