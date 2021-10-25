import _ from 'lodash';

import { usePatches, useSynthesizers } from '../../../../../state';
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

  const addPatch = () => {
    const patch = allPatches[0];

    const newId = createPatch({
      ...patch,
      volume: 100,
      mapping: {},
      transposition: 0
    });
    setSelectedPatchId(newId);
  };

  return (
    <Container flex="0 0 200px">
      <Header
        buttons={[
          ['sortDown', sortPatches, _.isEmpty(patches)],
          ['add', addPatch, _.isEmpty(synthesizers)]
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
