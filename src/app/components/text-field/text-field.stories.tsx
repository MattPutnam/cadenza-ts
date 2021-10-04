import { useState } from 'react';

import { TextField } from '.';
import { disableArg, storyWrapper, textArg } from '../../../storybook-components';

export default {
  title: 'Components / Text Field',
  component: TextField,
  decorators: storyWrapper,
  argTypes: {
    label: textArg('Name:'),
    value: disableArg,
    setValue: disableArg,
    size: disableArg,
    style: disableArg
  }
};

export const TextFieldStory = ({ label }) => {
  const [value, setValue] = useState('');

  return <TextField label={label} value={value} setValue={setValue} />;
};
TextFieldStory.storyName = 'Text Field';
