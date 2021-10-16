import React from 'react';

import _ from 'lodash';

import { usePatches, useSynthesizers } from '../../../../../state';
import { PatchSelection } from '../../../../../types';
import { Button, Container, Header, Flex, TextField, Title } from '../../../../components';

interface Props {
  patch: PatchSelection;
}

export const PatchNamer = ({ patch }: Props) => {
  const { updatePatch } = usePatches();
  const { allPatches } = useSynthesizers();

  const changeName = (newName: string) => {
    updatePatch(patch.id, { name: newName });
  };

  const useDefaultName = () => {
    const foundPatch = _.find(allPatches, {
      synthesizerId: patch.synthesizerId,
      bank: patch.bank,
      number: patch.number
    });
    if (foundPatch) {
      updatePatch(patch.id, { name: foundPatch.name });
    }
  };

  return (
    <Container alternate flex="none" marginCollapse="top">
      <Header>
        <Title>Name</Title>
      </Header>
      <Flex pad>
        <TextField value={patch.name} setValue={changeName} />
        <Button disabled={patch.number === undefined} onClick={useDefaultName}>
          Use default
        </Button>
      </Flex>
    </Container>
  );
};
