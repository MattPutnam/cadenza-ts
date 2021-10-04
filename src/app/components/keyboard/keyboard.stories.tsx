import { useState } from 'react';

import { Keyboard } from '.';
import * as Midi from '../../../midi';
import { noControls, storyWrapper } from '../../../storybook-components';

const keyboard = {
  range: {
    lowNote: 50,
    highNote: 100
  },
  midiInterfaceName: 'dummy',
  channel: 0,
  id: 0
};

export default {
  title: 'Components / Keyboard',
  decorators: storyWrapper
};

export const OnKeyClick = noControls(() => {
  const [key, setKey] = useState<number | undefined>(undefined);

  return (
    <>
      <Keyboard keyboard={keyboard} onKeyClick={setKey} />
      <div>{`Key clicked: ${key ? Midi.midiNoteNumberToName(key) : 'none'}`}</div>
    </>
  );
});
OnKeyClick.storyName = 'onKeyClick';

export const OnRangeDrag = noControls(() => {
  const [range, setRange] = useState<[number, number] | undefined>(undefined);

  return (
    <>
      <Keyboard keyboard={keyboard} onRangeDrag={setRange} />
      <div>{`Range dragged: ${
        range
          ? `${Midi.midiNoteNumberToName(range[0], 'flats')}-${Midi.midiNoteNumberToName(range[1], 'sharps')}`
          : 'none'
      }`}</div>
    </>
  );
});
OnRangeDrag.storyName = 'onRangeDrag';

export const HighlightKeys = noControls(() => {
  return <Keyboard keyboard={keyboard} highlightKeys={[60, 70, 80]} />;
});
HighlightKeys.storyName = 'highlightKeys';

export const LightHighlightKeys = noControls(() => {
  return <Keyboard keyboard={keyboard} lightHighlightKeys={[60, 70, 80]} />;
});
LightHighlightKeys.storyName = 'lightHighlightKeys';

export const OnKeyClickHighlightKeys = noControls(() => {
  const [key, setKey] = useState<number | undefined>(undefined);

  return (
    <>
      <Keyboard keyboard={keyboard} onKeyClick={setKey} highlightKeys={[60, 72, 84]} />
      <div>{`Key clicked: ${key ? Midi.midiNoteNumberToName(key) : 'none'}`}</div>
    </>
  );
});
OnKeyClickHighlightKeys.storyName = 'onKeyClick and highlightKeys';
