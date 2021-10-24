import React from 'react';

import _ from 'lodash';

import { useCues, useKeyboards } from '../../../../../../state';
import { KeyboardDefinition } from '../../../../../../types';
import { Center, Container, Content, Header, KeyboardPanel } from '../../../../../components';
import { ChannelSelector } from '../channel-selector';
import { InterfaceSelector } from '../interface-selector';
import { KeyboardSizeSelector } from './keyboard-size-selector';

interface Props {
  keyboard: KeyboardDefinition;
  deleteSelf: () => void;
  moveUp?: () => void;
  moveDown?: () => void;
}

export const KeyboardConfig = ({ keyboard, deleteSelf, moveUp, moveDown }: Props) => {
  const { cues } = useCues();

  const deleteDisabled = _.some(cues, (cue) => {
    return _.some(cue.patchUsages, (patchUsage) => {
      return patchUsage.keyboardId === keyboard.id;
    });
  });

  const { updateKeyboard } = useKeyboards();

  return (
    <Container alternate>
      <Header
        buttons={[
          ['arrowUp', moveUp],
          ['arrowDown', moveDown],
          ['delete', deleteSelf, deleteDisabled]
        ]}
      >
        <InterfaceSelector
          hardware={keyboard}
          forIO="inputs"
          setMidiInterfaceName={(midiInterfaceName) => updateKeyboard(keyboard.id, { midiInterfaceName })}
        />
        <ChannelSelector
          channel={keyboard.channel}
          setChannel={(channel) => updateKeyboard(keyboard.id, { channel })}
        />
      </Header>
      <Content>
        <Center pad>
          <KeyboardPanel keyboard={keyboard} listenerId={`${keyboard.midiInterfaceName}&${keyboard.channel}&CONFIG`} />
        </Center>
        <Center pad>
          <KeyboardSizeSelector keyboard={keyboard} setRange={(range) => updateKeyboard(keyboard.id, { range })} />
        </Center>
      </Content>
    </Container>
  );
};
