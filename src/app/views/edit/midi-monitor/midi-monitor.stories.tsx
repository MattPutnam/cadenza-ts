import { MidiInterfaceProvider } from '../../../../midi';
import { noControls } from '../../../../storybook-components';
import { MidiMonitor } from './midi-monitor';

export default {
  title: 'Views / Edit / Setup / Midi Monitor'
};

export const MidiMonitorStory = noControls(() => {
  return (
    <MidiInterfaceProvider>
      <MidiMonitor />
    </MidiInterfaceProvider>
  );
});
MidiMonitorStory.storyName = 'Midi Monitor';
