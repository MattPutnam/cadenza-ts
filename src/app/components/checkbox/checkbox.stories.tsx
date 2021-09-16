import { useState } from 'react';

import { Checkbox } from '.';
import { storyWrapper } from '../../../storybook-components';

export default {
  title: 'Components / Checkbox',
  decorators: storyWrapper
};

export const CheckboxStory = () => {
  const [checked, setChecked] = useState(false);

  return <Checkbox checked={checked} onChange={setChecked} label="Check me" />;
};
CheckboxStory.storyName = 'Checkbox';
