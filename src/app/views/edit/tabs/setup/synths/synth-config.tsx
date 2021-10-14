import React from 'react';

import _ from 'lodash';

import { useSynthesizers } from '../../../../../../state';
import { SynthesizerConfig } from '../../../../../../types';
import { Container, Content, Flex, Header } from '../../../../../components';
import { InterfaceSelector } from '../interface-selector';
import { ExpansionConfig } from './expansion-config';
import { MultiChannelSelector } from './multi-channel-selector';
import { SynthSelector } from './synth-selector';

interface Props {
  synthesizer: SynthesizerConfig;
  deleteSelf: () => void;
  moveUp?: () => void;
  moveDown?: () => void;
}

export const SynthConfig = ({ synthesizer, deleteSelf, moveUp, moveDown }: Props) => {
  const { updateSynthesizer } = useSynthesizers();
  // TODO: reimplement disabling delete
  // const inUse = _.some(data.patches, { synthesizerId: synth.id });
  const inUse = false;

  const synthStyle = {
    verticalAlign: 'top'
  };

  return (
    <Container alternate>
      <Header
        buttons={[
          ['delete', deleteSelf, inUse],
          ['arrowUp', moveUp],
          ['arrowDown', moveDown]
        ]}
      >
        <InterfaceSelector
          hardware={synthesizer}
          forIO="outputs"
          setMidiInterfaceName={(name) => updateSynthesizer(synthesizer.id, { name })}
        />
        <MultiChannelSelector synthesizer={synthesizer} />
      </Header>
      <Content>
        <Flex pad>
          <table>
            <tbody>
              <tr>
                <td>Synthesizer</td>
                <td>Expansions</td>
              </tr>
              <tr>
                <td style={synthStyle}>
                  <SynthSelector synthesizer={synthesizer} inUse={inUse} />
                </td>
                <td>
                  <ExpansionConfig synthesizer={synthesizer} />
                </td>
              </tr>
            </tbody>
          </table>
        </Flex>
      </Content>
    </Container>
  );
};
