import { useState } from 'react';

import { disableArg, storyWrapper } from '../../../storybook-components';
import { NumberField } from './number-field';

export default {
  title: 'Components / Number Field',
  component: NumberField,
  decorators: storyWrapper,
  argTypes: {
    label: { type: 'text', defaultValue: 'Label:', control: { type: 'text' } },
    value: disableArg,
    setValue: disableArg
  }
};

export const NumberFieldStory = ({ label, min, max }) => {
  const [value, setValue] = useState(0);

  return <NumberField label={label} value={value} min={min} max={max} setValue={setValue} />;
};
NumberFieldStory.storyName = 'Number Field';
