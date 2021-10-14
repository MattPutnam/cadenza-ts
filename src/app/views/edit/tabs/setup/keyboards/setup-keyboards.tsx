import React from 'react';

import _ from 'lodash';

import { useReorder } from '../../../../../../hooks/use-reorder';
import * as Midi from '../../../../../../midi';
import { useActionPedal, useKeyboards } from '../../../../../../state';
import { defaultRange, Keyboard } from '../../../../../../types';
import { findId } from '../../../../../../utils/id';
import { Container, Header, Content, Title, Placeholder, MidiListener } from '../../../../../components';
import { MidiInterfacePlaceholder } from '../interface-selector';
import { KeyboardConfig } from './keyboard-config';

export const SetupKeyboards = () => {
  const { keyboards, addKeyboard, deleteKeyboard, setKeyboards } = useKeyboards();
  const { actionPedal, updateActionPedal, setActionPedal } = useActionPedal();
  const { inputs } = Midi.useMidiInterfaces();
  const [moveUp, moveDown] = useReorder(keyboards, setKeyboards);

  const addNewKeyboardFromButton = React.useCallback(
    () =>
      addKeyboard({
        range: defaultRange,
        midiInterfaceName: inputs[0] ? Midi.midiInterfaceToName(inputs[0]) : MidiInterfacePlaceholder,
        channel: 0,
        id: findId(keyboards)
      }),
    [addKeyboard, inputs, keyboards]
  );

  const addNewKeyboardFromMidi = React.useCallback(
    (msg: Midi.MidiMessage) => {
      const { keyboardId, midiInterfaceName, channel } = msg;
      if (!_.some(keyboards, { id: keyboardId })) {
        addKeyboard({
          range: defaultRange,
          midiInterfaceName,
          channel,
          id: findId(keyboards)
        });
      }
    },
    [addKeyboard, keyboards]
  );

  const wrappedDelete = (keyboard: Keyboard) => {
    if (actionPedal?.keyboardId === keyboard.id) {
      if (keyboards.length > 1) {
        const newKeyboardId = _.find(keyboards, (kbd) => kbd.id !== keyboard.id)!.id;
        updateActionPedal({ keyboardId: newKeyboardId });
      } else {
        setActionPedal(undefined);
      }
    }
    deleteKeyboard(keyboard);
  };

  return (
    <Container collapse>
      <Header buttons={[['add', addNewKeyboardFromButton]]}>
        <Title>Keyboards</Title>
      </Header>
      <Content>
        {_.isEmpty(keyboards) && <Placeholder height="199px">No keyboards defined.</Placeholder>}
        {keyboards.map((keyboard, index) => (
          <KeyboardConfig
            key={keyboard.id}
            keyboard={keyboard}
            deleteSelf={() => wrappedDelete(keyboard)}
            moveUp={index > 0 ? moveUp(index) : undefined}
            moveDown={index < keyboards.length - 1 ? moveDown(index) : undefined}
          />
        ))}
        <MidiListener id="SetupKeyboards" dispatch={addNewKeyboardFromMidi} />
      </Content>
    </Container>
  );
};
