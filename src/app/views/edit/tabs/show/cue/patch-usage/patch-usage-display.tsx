import _ from 'lodash';
import styled from 'styled-components';

import { useKeyboards, usePatches } from '../../../../../../../state';
import { Cue, KeyboardDefinition, NormalPatchUsage, PatchUsage, toClosed } from '../../../../../../../types';
import * as KeyboardUtils from '../../../../../../../utils/keyboard-utils';
import {
  ButtonLike,
  Center,
  colors,
  Container,
  Content,
  Flex,
  Header,
  KeyboardPanel,
  Placeholder,
  Spacer,
  Title
} from '../../../../../../components';

interface Props {
  cue: Cue;
  selectedPatchUsage?: PatchUsage;
  setSelectedPatchUsage: (patchUsage?: PatchUsage) => void;
  addPatchUsage: (patchUsage: PatchUsage) => void;
}

export const PatchUsageDisplay = ({ cue, selectedPatchUsage, setSelectedPatchUsage, addPatchUsage }: Props) => {
  const { keyboards } = useKeyboards();
  const { patches } = usePatches();

  const patchUsagesByKeyboardId = _.groupBy(cue.patchUsages, 'keyboardId');

  const onRangeDrag = (keyboard: KeyboardDefinition, low: number, high: number) => {
    const newPatchUsage = new NormalPatchUsage(
      keyboard.id,
      patches[0].id,
      { lowNote: low, highNote: high },
      {},
      0,
      false
    );

    addPatchUsage(newPatchUsage);
  };

  return (
    <Container alternate collapse marginCollapse="top">
      <Header>
        <Title>Drag a range of notes to add a patch</Title>
      </Header>
      <Content>
        {_.isEmpty(keyboards) && <Placeholder height="50px">No keyboards defined</Placeholder>}
        {keyboards.map((keyboard) => {
          const patchUsages = patchUsagesByKeyboardId[keyboard.id] || [];
          const patchUsageRows = KeyboardUtils.groupIntoRows(patchUsages);
          return (
            <Center pad key={keyboard.id}>
              <Flex column align="stretch">
                <KeyboardPanel
                  keyboard={keyboard}
                  onKeyClick={(key) => onRangeDrag(keyboard, key, key)}
                  onRangeDrag={([low, high]) => onRangeDrag(keyboard, low, high)}
                />
                {patchUsageRows.map((patchUsageRow, index) => {
                  return (
                    <PatchUsageRow
                      key={index}
                      patchUsageRow={patchUsageRow}
                      keyboard={keyboard}
                      selectedPatchUsage={selectedPatchUsage}
                      setSelectedPatchUsage={setSelectedPatchUsage}
                    />
                  );
                })}
              </Flex>
            </Center>
          );
        })}
      </Content>
    </Container>
  );
};

interface PatchUsageRowProps {
  patchUsageRow: PatchUsage[];
  keyboard: KeyboardDefinition;
  selectedPatchUsage?: PatchUsage;
  setSelectedPatchUsage: (patchUsage?: PatchUsage) => void;
}

const PatchUsageBar = styled(ButtonLike)<{ width: number; selected: boolean }>`
  flex: 0 0 ${({ width }) => width}px;
  padding: 0.25rem 1px;
  border: 1px solid black;
  text-align: center;
  background-color: ${({ selected }) => (selected ? colors.blue[2] : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const PatchUsageRow = ({ patchUsageRow, keyboard, selectedPatchUsage, setSelectedPatchUsage }: PatchUsageRowProps) => {
  const { patches } = usePatches();

  const tagged = patchUsageRow.map((patchUsage) => {
    return {
      patchUsage,
      ...KeyboardUtils.getDimensions(keyboard.range, toClosed(patchUsage.range))
    };
  });

  let index = 0;
  let accum = 0;
  const elements: React.ReactNode[] = [];
  tagged.forEach(({ patchUsage, left, width }) => {
    let adjustedWidth = width;
    if (left > accum) {
      const diff = left - accum;
      elements.push(<Spacer key={index++} width={diff} />);
    } else if (left < accum) {
      adjustedWidth -= accum - left;
    }
    const { patchId } = patchUsage;
    const patch = _.find(patches, { id: patchId });
    const selected = selectedPatchUsage === patchUsage;
    elements.push(
      <PatchUsageBar
        key={index++}
        width={adjustedWidth}
        selected={selected}
        onClick={() => setSelectedPatchUsage(selected ? undefined : patchUsage)}
      >
        {patch ? patch.name : 'No Patch Selected'}
      </PatchUsageBar>
    );
    accum = left + width;
  });

  return <Flex>{elements}</Flex>;
};
