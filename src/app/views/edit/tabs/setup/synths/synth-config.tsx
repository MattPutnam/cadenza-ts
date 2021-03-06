import _ from 'lodash';
import styled from 'styled-components';

import { useSynthesizers } from '../../../../../../state';
import { SynthesizerConfig } from '../../../../../../types';
import { Container, Flex } from '../../../../../components';
import { InterfaceSelector } from '../interface-selector';
import { ExpansionConfig } from './expansion-config';
import { MultiChannelSelector } from './multi-channel-selector';
import { SynthSelector } from './synth-selector';

const SynthColumn = styled.td`
  vertical-align: top;
`;

interface Props {
  synthesizer: SynthesizerConfig;
  deleteSelf: () => void;
  moveUp?: () => void;
  moveDown?: () => void;
}

export const SynthConfig = ({ synthesizer, deleteSelf, moveUp, moveDown }: Props) => {
  const { updateSynthesizer, isInUse } = useSynthesizers();
  const inUse = isInUse(synthesizer.id);

  return (
    <Container
      alternate
      header={{
        contents: (
          <>
            <InterfaceSelector
              hardware={synthesizer}
              forIO="outputs"
              setMidiInterfaceName={(midiInterfaceName) => updateSynthesizer(synthesizer.id, { midiInterfaceName })}
            />
            <MultiChannelSelector synthesizer={synthesizer} />
          </>
        ),
        buttons: [
          ['arrowUp', moveUp],
          ['arrowDown', moveDown],
          ['delete', deleteSelf, inUse]
        ]
      }}
    >
      <Flex pad>
        <table>
          <tbody>
            <tr>
              <td>Synthesizer</td>
              <td>Expansions</td>
            </tr>
            <tr>
              <SynthColumn>
                <SynthSelector synthesizer={synthesizer} inUse={inUse} />
              </SynthColumn>
              <td>
                <ExpansionConfig synthesizer={synthesizer} />
              </td>
            </tr>
          </tbody>
        </table>
      </Flex>
    </Container>
  );
};
