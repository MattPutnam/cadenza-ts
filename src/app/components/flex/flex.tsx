import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

export type FlexProps = {
  column?: boolean;
  align?: string;
  pad?: boolean;
};

const FlexContainer = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  align-items: ${({ align, column }) => (align ? align : column ? 'flex-start' : 'baseline')};
  align-self: 'stretch';
  padding: ${({ pad }) => (pad ? '0.5rem' : '0px')};
`;

export const Flex = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<FlexProps & React.HTMLAttributes<HTMLDivElement>>
>((props, ref) => {
  const { column, align, pad, className, ...otherProps } = props;

  return (
    <FlexContainer ref={ref} column={column} align={align} pad={pad} className={className} {...otherProps}>
      {props.children}
    </FlexContainer>
  );
});

Flex.displayName = 'Flex';
