import { useState } from 'react';

import { Keyboard } from '.';
import * as Midi from '../../../midi';
import { Row, storyWrapper, StoryWrapper } from '../../../storybook-components';

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

export const OnKeyClick = () => {
  const [key, setKey] = useState<number | undefined>(undefined);

  return (
    <>
      <Keyboard keyboard={keyboard} onKeyClick={setKey} />
      <Row>{`Key clicked: ${key ? Midi.midiNoteNumberToName(key) : 'none'}`}</Row>
    </>
  );
};
OnKeyClick.storyName = 'onKeyClick';

export const OnRangeDrag = () => {
  const [range, setRange] = useState<[number, number] | undefined>(undefined);

  return (
    <StoryWrapper>
      <Keyboard keyboard={keyboard} onRangeDrag={setRange} />
      <Row>{`Range dragged: ${
        range
          ? `${Midi.midiNoteNumberToName(range[0], 'flats')}-${Midi.midiNoteNumberToName(range[1], 'sharps')}`
          : 'none'
      }`}</Row>
    </StoryWrapper>
  );
};
OnRangeDrag.storyName = 'onRangeDrag';

export const HighlightKeys = () => {
  return (
    <StoryWrapper>
      <Keyboard keyboard={keyboard} highlightKeys={[60, 70, 80]} />
    </StoryWrapper>
  );
};
HighlightKeys.storyName = 'highlightKeys';

export const LightHighlightKeys = () => {
  return (
    <StoryWrapper>
      <Keyboard keyboard={keyboard} lightHighlightKeys={[60, 70, 80]} />
    </StoryWrapper>
  );
};
LightHighlightKeys.storyName = 'lightHighlightKeys';

export const OnKeyClickHighlightKeys = () => {
  const [key, setKey] = useState<number | undefined>(undefined);

  return (
    <StoryWrapper>
      <Keyboard keyboard={keyboard} onKeyClick={setKey} highlightKeys={[60, 72, 84]} />
      <Row>{`Key clicked: ${key ? Midi.midiNoteNumberToName(key) : 'none'}`}</Row>
    </StoryWrapper>
  );
};
OnKeyClickHighlightKeys.storyName = 'onKeyClick and highlightKeys';
