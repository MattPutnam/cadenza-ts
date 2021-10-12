import _ from 'lodash';
import styled from 'styled-components';

import * as Midi from '../../../../../../midi';
import { useActionPedal, useKeyboards } from '../../../../../../state';
import { MidiInterfacePlaceholder } from '../interface-selector';

const LabelColumn = styled.td`
  text-align: right;
`;

export const ActionPedalDisplay = () => {
  const { keyboards } = useKeyboards();
  const { actionPedal } = useActionPedal();

  if (!actionPedal) {
    return <div>Not set up</div>;
  }
  if (keyboards.length === 0) {
    return <div>No keyboards available</div>;
  }

  const { keyboardId, controller, type, reverse } = actionPedal;
  const keyboard = _.find(keyboards, { id: keyboardId });

  if (!keyboard) {
    return <div>Keyboard not found</div>;
  }

  let { midiInterfaceName, channel } = keyboard;
  if (midiInterfaceName === MidiInterfacePlaceholder) {
    midiInterfaceName = 'Unconnected keyboard';
  }

  return (
    <table>
      <tbody>
        {keyboards.length > 1 && (
          <tr>
            <LabelColumn>Keyboard:</LabelColumn>
            <td>
              {midiInterfaceName} on channel {channel + 1}
            </td>
          </tr>
        )}
        <tr>
          <LabelColumn>Controller:</LabelColumn>
          <td>{Midi.longCCName(controller)}</td>
        </tr>
        <tr>
          <LabelColumn>Type:</LabelColumn>
          <td>
            {type}
            {reverse ? ', reversed' : ''}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
