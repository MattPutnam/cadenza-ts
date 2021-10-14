import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { useSynthesizers } from '../../../../../../state';
import { SynthesizerConfig } from '../../../../../../types';
import { Button, ButtonLike, colors, Label } from '../../../../../components';
import { Selectable, select } from '../../../../../components/utils';

export const allChannels = _.range(0, 16);

const ChannelButton = styled(ButtonLike)<Selectable>`
  display: inline-block;
  padding: 0.25rem;
  border: 1px solid black;
  background-color: ${select(colors.blue[2])};
  cursor: pointer;
  width: 28px;
  text-align: center;
  &:focus {
    z-index: 1;
  }
`;

interface Props {
  synthesizer: SynthesizerConfig;
}

export const MultiChannelSelector = ({ synthesizer }: Props) => {
  const { updateSynthesizer } = useSynthesizers();
  const update = React.useCallback(
    (channels: number[]) => {
      updateSynthesizer(synthesizer.id, { channels });
    },
    [synthesizer.id, updateSynthesizer]
  );

  const toggle = (channel: number, selected: boolean) => {
    if (selected) {
      update(_.filter(synthesizer.channels, (ch) => ch !== channel));
    } else {
      const newChannels = [...synthesizer.channels, channel];
      newChannels.sort();
      update(newChannels);
    }
  };

  return (
    <>
      <Label>Channels:</Label>
      {allChannels.map((ch) => {
        const selected = synthesizer.channels.includes(ch);
        return (
          <ChannelButton key={ch} selected={selected} onClick={() => toggle(ch, selected)}>
            {ch + 1}
          </ChannelButton>
        );
      })}
      <Button onClick={() => update(allChannels)}>All</Button>
      <Button onClick={() => update([])}>None</Button>
    </>
  );
};
