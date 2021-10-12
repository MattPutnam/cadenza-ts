import React from 'react';

import { MidiListener } from '.';
import { MidiInterfaceProvider } from '../../../midi';
import { noControls, storyWrapper } from '../../../storybook-components';

export default {
  title: 'Data / Webmidi / Midi Listener',
  decorators: storyWrapper
};

export const MidiListenerStory = noControls(() => {
  const [messages, setMessages] = React.useState([] as string[]);

  return (
    <MidiInterfaceProvider>
      <MidiListener id="test" dispatch={(msg) => setMessages([...messages, msg.toString()])} />
      <ol>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ol>
    </MidiInterfaceProvider>
  );
});
MidiListenerStory.storyName = 'Midi Listener';
