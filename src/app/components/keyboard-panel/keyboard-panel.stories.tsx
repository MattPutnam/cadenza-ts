import React from 'react';

import { KeyboardPanel } from '.';
import * as Midi from '../../../midi';
import { noControls, storyWrapper } from '../../../storybook-components';
import { defaultRange } from '../../../types';

const keyboard = {
  range: defaultRange,
  id: 0
};

export default {
  title: 'Components / KeyboardPanel',
  decorators: storyWrapper
};

export const OnKeyClick = noControls(() => {
  const [key, setKey] = React.useState<number | undefined>(undefined);

  return (
    <>
      <KeyboardPanel keyboard={keyboard} onKeyClick={setKey} />
      <div>{`Key clicked: ${key ? Midi.midiNoteNumberToName(key) : 'none'}`}</div>
    </>
  );
});
OnKeyClick.storyName = 'onKeyClick';

export const OnRangeDrag = noControls(() => {
  const [range, setRange] = React.useState<[number, number] | undefined>(undefined);

  return (
    <>
      <KeyboardPanel keyboard={keyboard} onRangeDrag={setRange} />
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
  return <KeyboardPanel keyboard={keyboard} highlightKeys={[60, 70, 80]} />;
});
HighlightKeys.storyName = 'highlightKeys';

export const LightHighlightKeys = noControls(() => {
  return <KeyboardPanel keyboard={keyboard} lightHighlightKeys={[60, 70, 80]} />;
});
LightHighlightKeys.storyName = 'lightHighlightKeys';

export const OnKeyClickHighlightKeys = noControls(() => {
  const [key, setKey] = React.useState<number | undefined>(undefined);

  return (
    <>
      <KeyboardPanel keyboard={keyboard} onKeyClick={setKey} highlightKeys={[60, 72, 84]} />
      <div>{`Key clicked: ${key ? Midi.midiNoteNumberToName(key) : 'none'}`}</div>
    </>
  );
});
OnKeyClickHighlightKeys.storyName = 'onKeyClick and highlightKeys';
