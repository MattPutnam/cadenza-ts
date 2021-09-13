import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

type Props = {
  column?: boolean;
  align?: string;
  pad?: boolean;
};

const FlexContainer = styled.div<Props>`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  align-items: ${({ align, column }) => (align ? align : column ? 'flex-start' : 'baseline')};
  align-self: 'stretch';
  padding: ${({ pad }) => (pad ? '0.5rem' : '0px')};
`;

export const Flex = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<Props & React.HTMLAttributes<HTMLDivElement>>
>((props, ref) => {
  const { column, align, pad } = props;

  return (
    <FlexContainer
      ref={ref}
      className={`flex ${props.column ? 'column' : 'row'}`}
      style={props.style}
      column={column}
      align={align}
      pad={pad}
    >
      {props.children}
    </FlexContainer>
  );
});

Flex.displayName = 'Flex';
