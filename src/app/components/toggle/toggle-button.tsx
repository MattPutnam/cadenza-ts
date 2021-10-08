import React, { useContext } from 'react';

import styled from 'styled-components';

import { ButtonLike, colors } from '..';
import { Selectable, select } from '../utils';
import { ToggleContext } from './context';

interface EndProps {
  first?: boolean;
  last?: boolean;
}

interface TabProps extends EndProps {
  index?: number;
}

type ButtonProp = Pick<TabProps, 'first' | 'last'>;

const StyledButton = styled(ButtonLike)<ButtonProp & Selectable>`
  display: inline;
  padding: 0.5rem 0.75rem;
  min-width: fit-content;
  cursor: pointer;
  background-color: ${select(colors.gray[2], colors.gray[3])};
  border-radius: ${({ first, last }) => (first ? '3px 0 0 3px' : last ? '0 3px 3px 0' : undefined)};
  border-right: ${({ last }) => (last ? undefined : `1px solid ${colors.gray[2]}`)};
`;

export const ToggleButton: React.FC<TabProps> = ({ index, first, last, children }) => {
  const { selectedIndex, setSelectedIndex } = useContext(ToggleContext);

  return (
    <StyledButton first={first} last={last} selected={selectedIndex === index} onClick={() => setSelectedIndex(index!)}>
      {children}
    </StyledButton>
  );
};
