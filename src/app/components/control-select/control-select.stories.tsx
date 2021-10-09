import React from 'react';

import { noControls } from '../../../storybook-components';
import { ControlOrNoneSelect } from './control-or-none-select';
import { ControlSelect } from './control-select';

export default {
  title: 'Components / Control Select'
};

export const ControlSelectStory = noControls(() => {
  const [selected, setSelected] = React.useState(0);

  return <ControlSelect selected={selected} setSelected={setSelected} />;
});
ControlSelectStory.storyName = 'Control Select';

export const ControlOrNoneSelectStory = noControls(() => {
  const [selected, setSelected] = React.useState<number | 'none'>('none');

  return <ControlOrNoneSelect selected={selected} setSelected={setSelected} />;
});
ControlOrNoneSelectStory.storyName = 'Control Or None Select';
