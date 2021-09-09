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

storiesOf('Components / Keyboard', module).add('Keyboard', () => {
  const [key, setKey] = useState<number | undefined>(undefined);

  return (
    <StoryWrapper title="Keyboard with onKeyClick">
      <Keyboard keyboard={keyboard} onKeyClick={setKey} />
      <Row>{`Key clicked: ${key ? Midi.midiNoteNumberToName(key) : 'none'}`}</Row>
    </StoryWrapper>
  );
});
