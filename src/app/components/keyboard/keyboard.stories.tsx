import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import { Keyboard } from '.';
import * as Midi from '../../../midi';
import { Row, StoryWrapper } from '../../../storybook-components';

const keyboard = {
  range: {
    lowNote: 50,
    highNote: 100
  },
  midiInterfaceName: 'dummy',
  channel: 0,
  id: 0
};

storiesOf('Components / Keyboard', module).add('onKeyClick', () => {
  const [key, setKey] = useState<number | undefined>(undefined);

  return (
    <StoryWrapper title="Keyboard with onKeyClick">
      <Keyboard keyboard={keyboard} onKeyClick={setKey} />
      <Row>{`Key clicked: ${key ? Midi.midiNoteNumberToName(key) : 'none'}`}</Row>
    </StoryWrapper>
  );
});

storiesOf('Components / Keyboard', module).add('onRangeDrag', () => {
  const [range, setRange] = useState<number[] | undefined>(undefined);

  return (
    <StoryWrapper title="Keyboard with onRangeDrag">
      <Keyboard keyboard={keyboard} onRangeDrag={setRange} />
      <Row>{`Range dragged: ${
        range ? `${Midi.midiNoteNumberToName(range[0])}-${Midi.midiNoteNumberToName(range[1])}` : 'none'
      }`}</Row>
    </StoryWrapper>
  );
});

storiesOf('Components / Keyboard', module).add('highlightKeys', () => {
  return (
    <StoryWrapper title="Keyboard with highlightKeys">
      <Keyboard keyboard={keyboard} highlightKeys={[60, 70, 80]} />
    </StoryWrapper>
  );
});

storiesOf('Components / Keyboard', module).add('lightHighlightKeys', () => {
  return (
    <StoryWrapper title="Keyboard with lightHighlightKeys">
      <Keyboard keyboard={keyboard} lightHighlightKeys={[60, 70, 80]} />
    </StoryWrapper>
  );
});

storiesOf('Components / Keyboard', module).add('onKeyClick and highlightKeys', () => {
  const [key, setKey] = useState<number | undefined>(undefined);

  return (
    <StoryWrapper title="Keyboard with onKeyClick and highlightKeys">
      <Keyboard keyboard={keyboard} onKeyClick={setKey} highlightKeys={[60, 72, 84]} />
      <Row>{`Key clicked: ${key ? Midi.midiNoteNumberToName(key) : 'none'}`}</Row>
    </StoryWrapper>
  );
});
