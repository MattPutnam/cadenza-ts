import React from 'react';

import { noControls, storyWrapper } from '../../../../../../storybook-components';
import { ChannelSelector } from './channel-selector';

export default {
  title: 'Views / Edit / Setup',
  decorators: storyWrapper
};

export const ChannelSelectorStory = noControls(() => {
  const [channel, setChannel] = React.useState(0);

  return (
    <>
      <ChannelSelector channel={channel} setChannel={setChannel} />
      <div>Actual channel value: {channel}</div>
    </>
  );
});
ChannelSelectorStory.storyName = 'Channel Selector';
