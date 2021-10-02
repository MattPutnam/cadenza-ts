import React, { useContext } from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { ButtonLike } from '..';
import { colors } from '../colors';
import { ListContext } from './context';

interface Props<T> {
  value?: T;
}

const StyledButtonLike = styled(ButtonLike)<{ selected: boolean }>`
  align-self: stretch;
  margin: 3px 0;
  background-color: ${(props) => (props.selected ? colors.blue[2] : undefined)};
  padding-left: 0.5rem;
  cursor: pointer;
`;

export function ListItem<T>({ value, children }: React.PropsWithChildren<Props<T>>): JSX.Element {
  const { selectedItem, setSelectedItem } = useContext(ListContext);
  const selected = _.isEqual(selectedItem, value);

  return (
    <StyledButtonLike selected={selected} onClick={() => setSelectedItem(selected ? undefined : value)}>
      {children}
    </StyledButtonLike>
  );
}
