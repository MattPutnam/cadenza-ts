import styled from 'styled-components';

import { usePatches } from '../../../../../state';
import { PatchSelection } from '../../../../../types';
import { Container, Content, Flex, Header, NumberField, Title } from '../../../../components';

const Column = styled(Flex)`
  height: 100%;
`;

const StyledNumberField = styled(NumberField)`
  margin: 0;
`;

const Slider = styled.input`
  -webkit-appearance: slider-vertical;
  margin: 1rem auto;
  width: 1rem;
  height: 100%;
`;

interface Props {
  patch: PatchSelection;
}

export const Volume = ({ patch }: Props) => {
  const { updatePatch } = usePatches();

  const setVolume = (newVolume: number) => {
    updatePatch(patch.id, { volume: newVolume });
  };

  return (
    <Container alternate flex="none" marginCollapse="left">
      <Header>
        <Title>Volume</Title>
      </Header>
      <Content>
        <Column column pad align="center">
          <StyledNumberField value={patch.volume} max={127} setValue={setVolume} />
          <Slider
            type="range"
            min={1}
            max={127}
            value={patch.volume}
            onChange={(e) => setVolume(parseInt(e.target.value, 10))}
          />
        </Column>
      </Content>
    </Container>
  );
};
