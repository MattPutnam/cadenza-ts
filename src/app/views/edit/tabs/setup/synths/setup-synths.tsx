import React from 'react';

import _ from 'lodash';

import { useReorder } from '../../../../../../hooks/use-reorder';
import { useSynthesizers } from '../../../../../../state';
import { Container, Content, Header, Placeholder, Title } from '../../../../../components';
import { MidiInterfacePlaceholder } from '../interface-selector';
import { allChannels } from './multi-channel-selector';
import { SynthConfig } from './synth-config';

export const SetupSynths = () => {
  const { synthesizers, setSynthesizers, createSynthesizer, deleteSynthesizer } = useSynthesizers();
  const [moveUp, moveDown] = useReorder(synthesizers, setSynthesizers);

  const addSynthesizerAction = React.useCallback(() => {
    createSynthesizer({
      name: 'Roland JV-1080',
      midiInterfaceName: MidiInterfacePlaceholder,
      expansionCards: {},
      channels: allChannels
    });
  }, [createSynthesizer]);

  return (
    <Container collapse marginCollapse="top">
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
              deleteSelf={() => deleteSynthesizer(synth.id)}
              moveUp={index > 0 ? moveUp(index) : undefined}
              moveDown={index < synthesizers.length - 1 ? moveDown(index) : undefined}
            />
          );
        })}
      </Content>
    </Container>
  );
};
