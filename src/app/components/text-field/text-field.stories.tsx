import { useState } from 'react';

import { TextField } from '.';
import { storyWrapper } from '../../../storybook-components';

export default {
  title: 'Components / Text Field',
  decorators: storyWrapper
};

export const NoLabel = () => {
  const [value, setValue] = useState('');

  return <TextField value={value} setValue={setValue} />;
};

export const WithLabel = () => {
  const [value, setValue] = useState('');

  return <TextField label="Name:" value={value} setValue={setValue} />;
};
