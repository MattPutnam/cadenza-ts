import React from 'react';

import { noControls } from '../../../storybook-components';
import { Toggle } from './toggle';
import { ToggleButton } from './toggle-button';

export default {
  title: 'Components / Toggle'
};

export const ToggleStory = noControls(() => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Toggle selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}>
      <ToggleButton>Option 1</ToggleButton>
      <ToggleButton>Option 2</ToggleButton>
      <ToggleButton>Option 3</ToggleButton>
    </Toggle>
  );
});
ToggleStory.storyName = 'Toggle';
