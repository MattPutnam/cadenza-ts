import { useState } from 'react';

import { storiesOf } from '@storybook/react';

import { Checkbox } from '.';

storiesOf('Components', module).add('Checkbox', () => {
  const [checked, setChecked] = useState(false);

  return <Checkbox checked={checked} onChange={setChecked} label="Check me" />;
});
