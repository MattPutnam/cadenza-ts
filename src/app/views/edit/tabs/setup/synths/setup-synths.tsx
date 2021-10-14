import React from 'react';

import _ from 'lodash';

import { useSynthesizers } from '../../../../../../state';
import { findId } from '../../../../../../utils/id';
import { Container, Content, Header, Placeholder, Title } from '../../../../../components';
import { MidiInterfacePlaceholder } from '../interface-selector';
import { allChannels } from './multi-channel-selector';
import { SynthConfig } from './synth-config';

export const SetupSynths = () => {
  const { synthesizers, setSynthesizers, addSynthesizer, deleteSynthesizer } = useSynthesizers();

  const moveUp = React.useCallback(
    (index: number) => () => {
      const copy = [...synthesizers];
      const elem = copy[index];
      const prev = copy[index - 1];
      copy[index - 1] = elem;
      copy[index] = prev;
      setSynthesizers(copy);
    },
    [synthesizers, setSynthesizers]
  );

  const moveDown = React.useCallback(
    (index: number) => () => {
      const copy = [...synthesizers];
      const elem = copy[index];
      const next = copy[index + 1];
      copy[index + 1] = elem;
      copy[index] = next;
      setSynthesizers(copy);
    },
    [synthesizers, setSynthesizers]
  );

  const addSynthesizerAction = React.useCallback(() => {
    addSynthesizer({
      name: 'Roland JV-1080',
      id: findId(synthesizers),
      midiInterfaceName: MidiInterfacePlaceholder,
      expansionCards: {},
      channels: allChannels
    });
  }, [addSynthesizer, synthesizers]);

  return (
    <Container collapse>
      <Header buttons={[['add', addSynthesizerAction]]}>
        <Title>Synthesizers</Title>
      </Header>
      <Content>
        {_.isEmpty(synthesizers) && <Placeholder>No synthesizers defined.</Placeholder>}
        {synthesizers.map((synth, index) => {
          return (
            <SynthConfig
              key={synth.id}
              synthesizer={synth}
              deleteSelf={() => deleteSynthesizer(synth)}
              moveUp={index > 0 ? moveUp(index) : undefined}
              moveDown={index < synthesizers.length - 1 ? moveDown(index) : undefined}
            />
          );
        })}
      </Content>
    </Container>
  );
};
