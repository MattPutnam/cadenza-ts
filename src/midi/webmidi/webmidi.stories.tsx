import { noControls, storyWrapper } from '../../storybook-components';
import { MidiInterfaceProvider, useMidiInterfaces } from './webmidi';

export default {
  title: 'Data / Webmidi / Midi Interface Provider',
  decorators: storyWrapper
};

export const MidiInterfaceProviderStory = noControls(() => {
  const TestComponent = () => {
    const { inputs, outputs } = useMidiInterfaces();

    return (
      <>
        <div>Available interfaces:</div>
        <div>Inputs: {inputs.map((input) => `${input.manufacturer} ${input.name}`).join(', ')}</div>
        <div>Outputs: {outputs.map((output) => `${output.manufacturer} ${output.name}`).join(', ')}</div>
      </>
    );
  };

  return (
    <MidiInterfaceProvider>
      <TestComponent />
    </MidiInterfaceProvider>
  );
});
MidiInterfaceProviderStory.storyName = 'Midi Interface Provider';
