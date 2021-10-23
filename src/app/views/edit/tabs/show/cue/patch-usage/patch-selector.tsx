import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { usePatches, useSynthesizers } from '../../../../../../../state';
import { PatchUsage } from '../../../../../../../types';
import { findId } from '../../../../../../../utils/id';
import {
  Button,
  Container,
  Content,
  Flex,
  Header,
  ObjectSelect,
  PatchPicker,
  PatchTreeSelection,
  Title
} from '../../../../../../components';

const StyledPatchPicker = styled(PatchPicker)`
  max-height: 200px;
  border-top: 1px solid black;
`;

interface Props {
  patchUsage: PatchUsage;
  updatePatchUsage: (patchUsage: Partial<PatchUsage>) => void;
}

export const PatchSelector = ({ patchUsage, updatePatchUsage }: Props) => {
  const [definingNew, setDefiningNew] = React.useState(false);
  const [patchTreeSelection, setPatchTreeSelection] = React.useState<PatchTreeSelection | undefined>(undefined);

  const { synthesizers, allPatches } = useSynthesizers();
  const { patches, addPatch } = usePatches();
  const firstPatch = allPatches[0];
  const firstPatchTreeSelection: PatchTreeSelection = [firstPatch.synthesizer, firstPatch.bank, firstPatch.number];

  const selectedPatch = _.find(patches, { id: patchUsage.patchId })!;

  const startDefiningNew = () => {
    setDefiningNew(true);
    setPatchTreeSelection(firstPatchTreeSelection);
  };

  const cancelDefineNew = () => {
    setDefiningNew(false);
  };

  const createNew = () => {
    if (!patchTreeSelection) return;

    const [synthName, bank, number] = patchTreeSelection;
    if (!synthName || !bank || number === undefined) return;

    const newId = findId(patches);
    const synthesizerId = _.find(synthesizers, { name: synthName })!.id;
    const patch = _.find(allPatches, { synthesizerId, bank, number })!;

    const newPatch = {
      id: newId,
      synthesizer: synthName,
      synthesizerId,
      bank,
      number,
      name: patch.name,
      volume: 100,
      mapping: {},
      transposition: 0
    };

    addPatch(newPatch);
    updatePatchUsage({ patchId: newId });
    setDefiningNew(false);
  };

  return (
    <Container>
      <Header>
        <Title>Patch</Title>
      </Header>
      <Content>
        <Flex pad>
          <ObjectSelect
            options={patches}
            selected={selectedPatch}
            setSelected={(patch) => updatePatchUsage({ patchId: patch.id })}
            render={(p) => p.name}
          />
          {!definingNew && <Button onClick={startDefiningNew}>Create new...</Button>}
          {definingNew && <Button onClick={cancelDefineNew}>Cancel</Button>}
          {selectedPatch && <Button onClick={createNew}>Confirm</Button>}
        </Flex>
        {definingNew && (
          <StyledPatchPicker
            alternate
            initialSelection={[synthesizers[0].name, undefined, undefined]}
            onPatchSelected={setPatchTreeSelection}
          />
        )}
      </Content>
    </Container>
  );
};
