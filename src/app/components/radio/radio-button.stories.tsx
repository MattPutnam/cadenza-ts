import React from 'react';

import { RadioButton, RadioButtonGroup } from '.';
import { noControls, storyWrapper, textArg } from '../../../storybook-components';

export default {
  title: 'Components / Radio',
  decorators: storyWrapper
};

export const RadioButtonStory = ({ text }) => <RadioButton>{text}</RadioButton>;
RadioButtonStory.argTypes = {
  text: textArg('Button Label')
};
RadioButtonStory.storyName = 'Radio Button';

export const RadioButtonGroupStory = noControls(() => {
  const [selected, setSelected] = React.useState(0);

  return (
    <RadioButtonGroup selected={selected} setSelected={setSelected}>
      <RadioButton>Option 1</RadioButton>
      <RadioButton>Option 2</RadioButton>
      <RadioButton>Option 3</RadioButton>
    </RadioButtonGroup>
  );
});
RadioButtonGroupStory.storyName = 'Radio Button Group';
