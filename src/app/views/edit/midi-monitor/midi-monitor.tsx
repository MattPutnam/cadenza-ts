import React from 'react';

import styled from 'styled-components';

import * as Midi from '../../../../midi';
import { colors, MidiListener } from '../../../components';

const MidiMonitorContainer = styled.div`
  width: 120px;
  text-align: center;
  padding: 4px;
  background-color: ${colors.blue[0]};
  color: ${colors.blue[3]};
  border-radius: 3px;
`;

const TopLabel = styled.div`
  font-size: 60%;
`;

const MidiInterfaceLabel = styled.div`
  font-size: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessageLabel = styled.div`
  font-family: monospace;
  font-size: 85%;
  padding: 2px;
  white-space: pre;
`;

export const MidiMonitor: React.FC<Record<string, never>> = () => {
  const [message, setMessage] = React.useState<Midi.MidiMessage | undefined>(undefined);

  return (
    <MidiMonitorContainer>
      <TopLabel>MIDI In</TopLabel>
      <MidiInterfaceLabel>{message ? message.midiInterfaceName : '--'}</MidiInterfaceLabel>
      <MessageLabel>{message ? message.toString() : '--'}</MessageLabel>
      <MidiListener id="MONITOR" dispatch={setMessage} />
    </MidiMonitorContainer>
  );
};
