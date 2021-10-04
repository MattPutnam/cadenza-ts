import { useState } from 'react';

import { Checkbox } from '.';
import { disableArg, storyWrapper, textArg } from '../../../storybook-components';

export default {
  title: 'Components / Checkbox',
  component: Checkbox,
  decorators: storyWrapper,
  argTypes: {
    label: textArg('Check me'),
    checked: disableArg,
    onChange: disableArg
  }
};

export const CheckboxStory = ({ label }) => {
  const [checked, setChecked] = useState(false);

  return <Checkbox checked={checked} onChange={setChecked} label={label} />;
};
CheckboxStory.storyName = 'Checkbox';
