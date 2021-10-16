import React from 'react';

import _ from 'lodash';

import { useReorder } from '../../../../../../hooks/use-reorder';
import { useSynthesizers } from '../../../../../../state';
import { findId } from '../../../../../../utils/id';
import { Container, Content, Header, Placeholder, Title } from '../../../../../components';
import { MidiInterfacePlaceholder } from '../interface-selector';
import { allChannels } from './multi-channel-selector';
import { SynthConfig } from './synth-config';

export const SetupSynths = () => {
  const { synthesizers, setSynthesizers, addSynthesizer, deleteSynthesizer } = useSynthesizers();
  const [moveUp, moveDown] = useReorder(synthesizers, setSynthesizers);

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
