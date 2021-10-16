import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { colors, Flex, icon, Spacer } from '..';
import { Selectable, select } from '../utils';

interface Props<T> {
  options?: T[];
  selected?: T;
  onChange: (value: T) => void;
  render: (value: T) => React.ReactNode;
  terminal?: boolean;
}

const SelectionContainer = styled.div`
  flex: 0 1 250px;
  border-right: 1px solid black;
  overflow-y: scroll;
`;

const Option = styled(Flex)<Selectable>`
  cursor: pointer;
  font-weight: 500;
  padding: 0 0.5rem;
  background-color: ${select(colors.blue[2])};
`;

export function Selection<T>({ options, selected, onChange, render, terminal }: Props<T>): JSX.Element {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: 'nearest' });
  });

  return (
    <SelectionContainer>
      {options &&
        options.map((option, index) => {
          const rendered = render(option);
          const isSelected = _.isEqual(selected, option);
          return (
            <Option
              key={index}
              selected={isSelected}
              align="center"
              ref={isSelected ? scrollRef : undefined}
              onClick={isSelected ? undefined : () => onChange(option)}
            >
              {rendered}
              {!terminal && (
                <>
                  <Spacer />
                  {icon('treeSeparator')}
                </>
              )}
            </Option>
          );
        })}
    </SelectionContainer>
  );
}
