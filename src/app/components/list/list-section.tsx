import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { ButtonLike, Flex, Icon } from '..';
import { colors } from '../colors';
import { ListContext } from './context';

interface ListSectionProps<T> {
  title: React.ReactNode;
  value: T;
}

const Container = styled(Flex)<{ selected: boolean }>`
  align-self: stretch;
  margin: 3px 0;
  font-weight: ${({ selected }) => (selected ? 'bold' : undefined)};
  background-color: ${({ selected }) => (selected ? colors.blue[2] : colors.gray[1])};
  cursor: pointer;
`;

const Title = styled(ButtonLike)`
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Caret = styled(Icon)`
  flex: none;
  margin: 0 0.25rem;
`;

export function ListSection<T>({ title, value, children }: React.PropsWithChildren<ListSectionProps<T>>): JSX.Element {
  const [collapsed, setCollapsed] = React.useState(false);
  const { selectedItem, setSelectedItem } = React.useContext(ListContext);

  const selected = _.isEqual(selectedItem, value);

  const keyCollapse = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      setCollapsed(false);
    } else if (e.key === 'ArrowLeft') {
      setCollapsed(true);
    } else if (e.key === ' ' || e.key === 'Enter') {
      setCollapsed(!collapsed);
    }
  };

  return (
    <>
      <Container selected={selected} align="center" onKeyDown={keyCollapse}>
        <Caret name={collapsed ? 'collapsed' : 'expanded'} tabIndex={0} onClick={() => setCollapsed(!collapsed)} />
        <Title onClick={() => setSelectedItem(selected ? undefined : value)}>{title}</Title>
      </Container>
      {!collapsed &&
        React.Children.map(children, (child) => {
          return React.cloneElement(child as React.ReactElement, { selectedItem, setSelectedItem });
        })}
    </>
  );
}
