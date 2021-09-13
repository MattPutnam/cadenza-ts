import React from 'react';

import { Flex, Spacer } from '.';

export const Center: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <Flex {...props}>
    <Spacer />
    {children}
    <Spacer />
  </Flex>
);
