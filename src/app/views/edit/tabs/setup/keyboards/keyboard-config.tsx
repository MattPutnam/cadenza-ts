import React from 'react';

import _ from 'lodash';

import { useKeyboards } from '../../../../../../state';
import { Keyboard as KeyboardType } from '../../../../../../types';
import { Center, Container, Content, Header, Keyboard } from '../../../../../components';
import { ChannelSelector } from '../channel-selector';
import { InterfaceSelector } from '../interface-selector';
import { KeyboardSizeSelector } from './keyboard-size-selector';

interface Props {
  keyboard: KeyboardType;
  deleteSelf: () => void;
  moveUp?: () => void;
  moveDown?: () => void;
}

export const KeyboardConfig = ({ keyboard, deleteSelf, moveUp, moveDown }: Props) => {
  // TODO
  // const deleteDisabled = _.some(data.show.cues, cue => {
  //   return _.some(cue.patchUsages, patchUsage => {
  //     return patchUsage.keyboardId === keyboard.id;
  //   });
  // });

  const { updateKeyboard } = useKeyboards();

  return (
    <Container alternate>
      <Header
        buttons={[
          ['arrowUp', moveUp],
          ['arrowDown', moveDown],
          ['delete', deleteSelf]
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
          <Keyboard keyboard={keyboard} listenerId={`${keyboard.midiInterfaceName}&${keyboard.channel}&CONFIG`} />
        </Center>
        <Center pad>
          <KeyboardSizeSelector keyboard={keyboard} setRange={(range) => updateKeyboard(keyboard.id, { range })} />
        </Center>
      </Content>
    </Container>
  );
};
