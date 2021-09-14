import { useState } from 'react';

import { storiesOf } from '@storybook/react';

import { Checkbox } from '.';
import { StoryWrapper } from '../../../storybook-components';

storiesOf('Components', module).add('Checkbox', () => {
  const [checked, setChecked] = useState(false);

  return (
    <StoryWrapper>
      <Checkbox checked={checked} onChange={setChecked} label="Check me" />
    </StoryWrapper>
  );
});
