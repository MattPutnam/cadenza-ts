import React from 'react';

import { storiesOf } from '@storybook/react';

import { Button } from '.';
import { StoryWrapper } from '../../../storybook-components';

const onClick = () => {};

storiesOf('Components / Button', module).add('Button', () => (
  <>
    <StoryWrapper title="Regular">
      <Button onClick={onClick}>Button</Button>
    </StoryWrapper>
    <StoryWrapper title="Large">
      <Button large onClick={onClick}>
        Button
      </Button>
    </StoryWrapper>
    <StoryWrapper title="Disabled">
      <Button disabled onClick={onClick}>
        Button
      </Button>
    </StoryWrapper>
    <StoryWrapper title="Large Disabled">
      <Button large disabled onClick={onClick}>
        Button
      </Button>
    </StoryWrapper>
  </>
));
