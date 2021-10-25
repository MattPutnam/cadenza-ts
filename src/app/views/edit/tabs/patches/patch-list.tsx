import _ from 'lodash';

import { usePatches, useSynthesizers } from '../../../../../state';
import { findId } from '../../../../../utils/id';
import { Container, Content, Header, List, ListItem, Title } from '../../../../components';

interface Props {
  selectedPatchId?: number;
  setSelectedPatchId: (id?: number) => void;
}

export const PatchList = ({ selectedPatchId, setSelectedPatchId }: Props) => {
  const { patches, setPatches, createPatch } = usePatches();
  const { synthesizers, allPatches } = useSynthesizers();

  const sortPatches = () => {
    setPatches(_.sortBy(patches, 'name'));
  };

  const doAddPatch = () => {
    const id = findId(patches);
    const patch = allPatches[0];

    createPatch({
      id,
      ...patch,
      volume: 100,
      mapping: {},
      transposition: 0
    });
    setSelectedPatchId(id);
  };

  return (
    <Container flex="0 0 200px">
      <Header
        buttons={[
          ['sortDown', sortPatches, _.isEmpty(patches)],
          ['add', doAddPatch, _.isEmpty(synthesizers)]
        ]}
      >
        <Title>Patches</Title>
      </Header>
      <Content>
        <List selectedItem={selectedPatchId} setSelectedItem={setSelectedPatchId}>
          {patches.map((patch) => {
            return (
              <ListItem key={patch.id} value={patch.id}>
                {patch.name || '<Untitled>'}
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};
