import _ from 'lodash';

import { useKeyboards } from '../../../../../../../state';
import { PatchUsage, Range } from '../../../../../../../types';
import { Center, Container, KeyboardPanel } from '../../../../../../components';

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
    const [klow, khigh] = keyboard.range;
    const [plow, phigh] = patchUsage.range;
    const newRange: Range = [Math.max(klow, plow), Math.min(khigh, phigh)];

    updatePatchUsage({ keyboardId: newKeyboard.id, range: newRange });
  };

  return (
    <Container
      header={{
        title: 'Set Range',
        buttons: [
          ['arrowUp', () => move(keyboardIndex - 1), !moreAbove],
          ['arrowDown', () => move(keyboardIndex + 1), !moreBelow]
        ]
      }}
    >
      <Center pad>
        <KeyboardPanel
          keyboard={keyboard}
          onKeyClick={(key) => updatePatchUsage({ range: [key, key] })}
          onRangeDrag={(range) => updatePatchUsage({ range })}
        />
      </Center>
    </Container>
  );
};
