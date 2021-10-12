import React from 'react';

import { Flex, FlexProps, Spacer } from '.';

export const Center: React.FC<FlexProps> = ({ children, ...props }) => (
  <Flex {...props}>
    <Spacer />
    {children}
    <Spacer />
  </Flex>
);
