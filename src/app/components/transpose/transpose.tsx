import React from 'react';

import styled from 'styled-components';

import { Button, Select, NumberField, Container, Header, Title, Flex } from '..';

const PaddedNumberField = styled(NumberField)`
  margin-right: 0.5rem;
`;

interface Props {
  transposition: number;
  setTransposition: (newValue: number) => void;
  alternate?: boolean;
}

export const Transpose = ({ transposition, setTransposition, alternate }: Props) => {
  const down = transposition < 0;
  const absTransposition = Math.abs(transposition);
  const steps = absTransposition % 12;
  const octaves = Math.floor(absTransposition / 12);

  const setOctaves = React.useCallback(
    (newOctaves: number) => {
      setTransposition((newOctaves * 12 + steps) * (down ? -1 : 1));
    },
    [down, steps, setTransposition]
  );

  const setSteps = React.useCallback(
    (newSteps: number) => {
      setTransposition((octaves * 12 + newSteps) * (down ? -1 : 1));
    },
    [down, octaves, setTransposition]
  );

  return (
    <Container key={transposition} alternate={alternate} flex="none">
      <Header>
        <Title>Transposition</Title>
      </Header>
      <Flex pad>
        {/* max of 10 just to make the fields the same size */}
        <PaddedNumberField label="Transpose" value={octaves} max={10} setValue={setOctaves} />
        <PaddedNumberField label="octaves plus" value={steps} max={11} setValue={setSteps} />
        <Select
          label="half steps"
          disabled={!transposition}
          options={['Up', 'Down']}
          selected={down ? 'Down' : 'Up'}
          setSelected={(newValue) => setTransposition(absTransposition * (newValue === 'Up' ? 1 : -1))}
        />
        {transposition ? (
          <Button disabled={!transposition} onClick={() => setTransposition(0)}>
            Clear
          </Button>
        ) : undefined}
      </Flex>
    </Container>
  );
};
