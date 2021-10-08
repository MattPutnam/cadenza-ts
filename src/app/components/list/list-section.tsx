import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { ButtonLike, Flex, icon } from '..';
import { colors } from '../colors';
import { select, Selectable } from '../utils';
import { ListContext } from './context';

interface ListSectionProps<T> {
  title: React.ReactNode;
  value: T;
}

const ListSectionContainer = styled(Flex)<Selectable>`
  align-self: stretch;
  margin: 3px 0;
  font-weight: ${select('bold')};
  background-color: ${select(colors.blue[2], colors.gray[1])};
  cursor: pointer;
`;

const ListSectionTitle = styled(ButtonLike)`
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Caret = styled(ButtonLike)`
  flex: 0;
  margin: 0 0.25rem;
`;

export function ListSection<T>({ title, value, children }: React.PropsWithChildren<ListSectionProps<T>>): JSX.Element {
  const [collapsed, setCollapsed] = React.useState(false);
  const { selectedItem, setSelectedItem } = React.useContext(ListContext);

  const selected = _.isEqual(selectedItem, value);

  const keyCollapse = React.useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight') {
      setCollapsed(false);
    } else if (e.key === 'ArrowLeft') {
      setCollapsed(true);
    }
  }, []);

  return (
    <>
      <ListSectionContainer selected={selected} align="center">
        <Caret onClick={() => setCollapsed(!collapsed)} onKeyDown={keyCollapse}>
          {icon(collapsed ? 'collapsed' : 'expanded')}
        </Caret>
        <ListSectionTitle onClick={() => setSelectedItem(selected ? undefined : value)}>{title}</ListSectionTitle>
      </ListSectionContainer>
      {!collapsed && children}
    </>
  );
}
