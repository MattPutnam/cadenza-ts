import React from 'react';

import { NumberField } from '../../../../../components';

interface Props {
  channel: number;
  setChannel: (channel: number) => void;
}

export const ChannelSelector = ({ channel, setChannel }: Props) => {
  return (
    <NumberField
      label="Channel:"
      value={channel + 1}
      min={1}
      max={16}
      setValue={(newValue) => setChannel(newValue - 1)}
    />
  );
};
