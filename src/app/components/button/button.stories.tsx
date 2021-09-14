import { storiesOf } from '@storybook/react';

import { Button, ButtonLike } from '.';
import { StoryWrapper } from '../../../storybook-components';

storiesOf('Components / Button', module).add('Normal', () => <Button onClick={() => {}}>Button</Button>);

storiesOf('Components / Button', module).add('Large', () => (
  <Button large onClick={() => {}}>
    Button
  </Button>
));

storiesOf('Components / Button', module).add('Disabled', () => (
  <Button disabled onClick={() => {}}>
    Button
  </Button>
));

storiesOf('Components / Button', module).add('Large Disabled', () => (
  <Button large disabled onClick={() => {}}>
    Button
  </Button>
));

storiesOf('Components / Button', module).add('ButtonLike', () => (
  <StoryWrapper>
    <ButtonLike>
      <span>I'm clickable too!</span>
    </ButtonLike>
  </StoryWrapper>
));
