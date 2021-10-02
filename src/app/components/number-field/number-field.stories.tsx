import { useState } from 'react';

import { storyWrapper } from '../../../storybook-components';
import { NumberField } from './number-field';

export default {
  title: 'Components / Number Field',
  decorators: storyWrapper
};

export const NoLabel = () => {
  const [value, setValue] = useState(0);

  return <NumberField value={value} setValue={setValue} />;
};

export const WithLabel = () => {
  const [value, setValue] = useState(0);

  return <NumberField label="Name:" value={value} setValue={setValue} />;
};
