import styled from 'styled-components';

import { Flex, Center, Spacer } from '.';
import { storyWrapper } from '../../../storybook-components';
import { Button } from '../button';

export default {
  title: 'Components / Flex',
  decorators: storyWrapper
};

const DecoratedFlex = styled(Flex)`
  border: 1px dotted;
`;

export const FlexRow = () => (
  <DecoratedFlex>
    <Button large onClick={() => {}}>
      A button
    </Button>
    <Spacer width={10} />
    Spacer of 10px on either side of this
    <Spacer width={10} />
    <Button large onClick={() => {}}>
      And another button
    </Button>
  </DecoratedFlex>
);

export const FlexColumn = () => (
  <DecoratedFlex column>
    <Button large onClick={() => {}}>
      A button
    </Button>
    And then some text
    <Button large onClick={() => {}}>
      And another button
    </Button>
  </DecoratedFlex>
);

export const CenterStory = () => <Center>Centered element</Center>;
CenterStory.storyName = 'Center';
