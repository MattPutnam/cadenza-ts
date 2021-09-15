import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
import styled from 'styled-components';

import { colors } from '../app/components';

export const Row = styled.div``;

export const Title = styled.h2`
  margin-top: 0;
`;

export const StoryWrapper = styled.div`
  background-color: ${colors.blue[2]};
  padding: 0.5rem;
`;

export const storyWrapper = [
  (Story: () => StoryFnReactReturnType) => (
    <StoryWrapper>
      <Story />
    </StoryWrapper>
  )
];
