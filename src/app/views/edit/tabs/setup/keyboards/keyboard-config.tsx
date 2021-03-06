import _ from 'lodash';

import { useKeyboards } from '../../../../../../state';
import { KeyboardDefinition } from '../../../../../../types';
import { Center, Container, KeyboardPanel } from '../../../../../components';
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
  const { updateKeyboard, isInUse } = useKeyboards();

  return (
    <Container
      alternate
      header={{
        contents: (
          <>
            <InterfaceSelector
              hardware={keyboard}
              forIO="inputs"
              setMidiInterfaceName={(midiInterfaceName) => updateKeyboard(keyboard.id, { midiInterfaceName })}
            />
            <ChannelSelector
              channel={keyboard.channel}
              setChannel={(channel) => updateKeyboard(keyboard.id, { channel })}
            />
          </>
        ),
        buttons: [
          ['arrowUp', moveUp],
          ['arrowDown', moveDown],
          ['delete', deleteSelf, isInUse(keyboard.id)]
        ]
      }}
    >
      <Center pad>
        <KeyboardPanel keyboard={keyboard} listenerId={`${keyboard.midiInterfaceName}&${keyboard.channel}&CONFIG`} />
      </Center>
      <Center pad>
        <KeyboardSizeSelector keyboard={keyboard} setRange={(range) => updateKeyboard(keyboard.id, { range })} />
      </Center>
    </Container>
  );
};
