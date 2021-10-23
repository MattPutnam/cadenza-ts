import _ from 'lodash';

import { useKeyboards } from '../../../../../../../state';
import { PatchUsage } from '../../../../../../../types';
import { Center, Container, Content, Header, KeyboardPanel, Title } from '../../../../../../components';

interface Props {
  patchUsage: PatchUsage;
  updatePatchUsage: (patchUsage: Partial<PatchUsage>) => void;
}

export const RangeSelector = ({ patchUsage, updatePatchUsage }: Props) => {
  const { keyboards } = useKeyboards();
  const keyboardIndex = _.findIndex(keyboards, { id: patchUsage.keyboardId });
  const keyboard = keyboards[keyboardIndex];

  const moreAbove = keyboardIndex > 0;
  const moreBelow = keyboardIndex < keyboards.length - 1;

  const move = (newIndex: number) => {
    const newKeyboard = keyboards[newIndex];
    const { lowNote, highNote } = patchUsage.range;
    const newLow =
      lowNote === keyboard.range.lowNote
        ? newKeyboard.range.lowNote
        : lowNote! < keyboard.range.lowNote
        ? keyboard.range.lowNote
        : lowNote;
    const newHigh =
      highNote === keyboard.range.highNote
        ? newKeyboard.range.highNote
        : highNote! > keyboard.range.highNote
        ? keyboard.range.highNote
        : highNote;

    updatePatchUsage({ keyboardId: newKeyboard.id, range: { lowNote: newLow, highNote: newHigh } });
  };

  return (
    <Container>
      <Header
        buttons={[
          ['arrowUp', () => move(keyboardIndex - 1), !moreAbove],
          ['arrowDown', () => move(keyboardIndex + 1), !moreBelow]
        ]}
      >
        <Title>Set Range</Title>
      </Header>
      <Content>
        <Center pad>
          <KeyboardPanel
            keyboard={keyboard}
            onKeyClick={(key) => updatePatchUsage({ range: { lowNote: key, highNote: key } })}
            onRangeDrag={([lowNote, highNote]) => updatePatchUsage({ range: { lowNote, highNote } })}
          />
        </Center>
      </Content>
    </Container>
  );
};
