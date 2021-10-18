import styled from 'styled-components';

import { colors } from '../app/components';

export const StoryWrapper = styled.div`
  background-color: ${colors.blue[2]};
  padding: 0.5rem;
`;

export const storyWrapper = [
  (Story: () => any) => (
    <StoryWrapper>
      <Story />
    </StoryWrapper>
  )
];

export const textArg = (defaultValue: string) => ({ type: 'text', defaultValue, control: { type: 'text' } });

export const disableArg = { table: { disable: true } };

export const noControls = (component: any) => {
  component.parameters = {
    ...component.parameters,
    controls: { hideNoControlsWarning: true }
  };
  return component;
};
