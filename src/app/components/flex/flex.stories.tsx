import { storiesOf } from '@storybook/react';

import { Flex, Center, Spacer } from '.';
import { Button } from '../button';

storiesOf('Components / Flex', module).add('Flex Row', () => (
  <Flex style={{ border: '1px dotted ' }}>
    <Button onClick={() => {}}>A button</Button>
    <Spacer width={10} />
    Spacer of 10px on either side of this
    <Spacer width={10} />
    <Button onClick={() => {}}>And another button</Button>
  </Flex>
));

storiesOf('Components / Flex', module).add('Flex Column', () => (
  <Flex column style={{ border: '1px dotted ' }}>
    <Button onClick={() => {}}>A button</Button>
    And then some text
    <Button onClick={() => {}}>And another button</Button>
  </Flex>
));

storiesOf('Components / Flex', module).add('Center', () => <Center>Centered element</Center>);
