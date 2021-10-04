import { Flex, Center, Spacer } from '.';
import { noControls, storyWrapper } from '../../../storybook-components';
import { Button } from '../button';

export default {
  title: 'Components / Flex',
  decorators: storyWrapper
};

export const FlexRow = noControls(() => (
  <Flex>
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
));

export const FlexColumn = noControls(() => (
  <Flex column>
    <Button large onClick={() => {}}>
      A button
    </Button>
    And then some text
    <Button large onClick={() => {}}>
      And another button
    </Button>
  </Flex>
));

export const CenterStory = noControls(() => <Center>Centered element</Center>);
CenterStory.storyName = 'Center';
