import { storiesOf } from '@storybook/react';

import { Flex, Center, Spacer } from '.';
import { StoryWrapper } from '../../../storybook-components';
import { Button } from '../button';

storiesOf('Components / Flex', module).add('Flex Row', () => (
  <StoryWrapper>
    <Flex style={{ border: '1px dotted ' }}>
      <Button large onClick={() => {}}>
        A button
      </Button>
      <Spacer width={10} />
      Spacer of 10px on either side of this
      <Spacer width={10} />
      <Button large onClick={() => {}}>
        And another button
      </Button>
    </Flex>
  </StoryWrapper>
));

storiesOf('Components / Flex', module).add('Flex Column', () => (
  <StoryWrapper>
    <Flex column style={{ border: '1px dotted ' }}>
      <Button large onClick={() => {}}>
        A button
      </Button>
      And then some text
      <Button large onClick={() => {}}>
        And another button
      </Button>
    </Flex>
  </StoryWrapper>
));

storiesOf('Components / Flex', module).add('Center', () => (
  <StoryWrapper>
    <Center>Centered element</Center>
  </StoryWrapper>
));
