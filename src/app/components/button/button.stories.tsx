import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import { Button } from '.';
import { Row, StoryWrapper } from '../../../storybook-components';

storiesOf('Components / Button', module).add('Button', () => {
  const [count, setCount] = useState(0);

  const onClick = () => setCount(count + 1);

  return (
    <>
      <Row>Click count: {count}</Row>
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
  );
});
