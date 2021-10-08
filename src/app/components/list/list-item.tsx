import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { ButtonLike } from '..';
import { colors } from '../colors';
import { select, Selectable } from '../utils';
import { ListContext } from './context';

interface Props<T> {
  value?: T;
}

const StyledButtonLike = styled(ButtonLike)<Selectable>`
  align-self: stretch;
  margin: 3px 0;
  background-color: ${select(colors.blue[2])};
  padding-left: 0.5rem;
  cursor: pointer;
`;

export function ListItem<T>({ value, children }: React.PropsWithChildren<Props<T>>): JSX.Element {
  const { selectedItem, setSelectedItem } = React.useContext(ListContext);
  const selected = _.isEqual(selectedItem, value);

  return (
    <StyledButtonLike selected={selected} onClick={() => setSelectedItem(selected ? undefined : value)}>
      {children}
    </StyledButtonLike>
  );
}
