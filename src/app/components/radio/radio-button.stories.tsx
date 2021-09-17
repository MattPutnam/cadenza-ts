import React from 'react';

import { storyWrapper } from '../../../storybook-components';
import { RadioButton, RadioButtonGroup } from '../radio';

export default {
  title: 'Components / Radio',
  decorators: storyWrapper
};

export const RadioButtonStory = () => <RadioButton>Button Label</RadioButton>;
RadioButtonStory.storyName = 'Radio Button';

export const RadioButtonGroupStory = () => {
  const [selected, setSelected] = React.useState(0);

  return (
    <RadioButtonGroup selected={selected} setSelected={setSelected}>
      <RadioButton>Option 1</RadioButton>
      <RadioButton>Option 2</RadioButton>
      <RadioButton>Option 3</RadioButton>
    </RadioButtonGroup>
  );
};
RadioButtonGroupStory.storyName = 'Radio Button Group';
