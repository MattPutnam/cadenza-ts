import _ from 'lodash';
import styled from 'styled-components';

import { useActionPedal, useKeyboards } from '../../../../../../state';
import { actionPedalTypes } from '../../../../../../types';
import { Checkbox, ControlSelect, ObjectSelect, Select } from '../../../../../components';

const LabelColumn = styled.td`
  text-align: right;
`;

export const ActionPedalDisplay = () => {
  const { keyboards } = useKeyboards();
  const { actionPedal, updateActionPedal } = useActionPedal();

  if (keyboards.length === 0) {
    return <div>No keyboards available</div>;
  }

  if (!actionPedal) {
    return <div>Not set up</div>;
  }

  const { keyboardId, controller, type, reverse } = actionPedal;
  const keyboard = _.find(keyboards, { id: keyboardId });

  if (!keyboard) {
    return <div>Keyboard not found</div>;
  }

  return (
    <table>
      <tbody>
        <tr>
          <LabelColumn>Keyboard:</LabelColumn>
          <td>
            <ObjectSelect
              options={keyboards}
              render={(keyboard) => `${keyboard.midiInterfaceName} on ch. ${keyboard.channel + 1}`}
              selected={keyboard}
              setSelected={(keyboard) => updateActionPedal({ keyboardId: keyboard.id })}
            />
          </td>
        </tr>
        <tr>
          <LabelColumn>Controller:</LabelColumn>
          <td>
            <ControlSelect selected={controller} setSelected={(value) => updateActionPedal({ controller: value })} />
          </td>
        </tr>
        <tr>
          <LabelColumn>Type:</LabelColumn>
          <td>
            <Select options={actionPedalTypes} selected={type} setSelected={(type) => updateActionPedal({ type })} />
          </td>
        </tr>
        <tr>
          <LabelColumn>Reverse:</LabelColumn>
          <td>
            <Checkbox checked={reverse} onChange={(newValue) => updateActionPedal({ reverse: newValue })} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
