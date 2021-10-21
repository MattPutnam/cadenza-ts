import { WaitTriggerAction } from '../../../../../../../types';
import { Flex, NumberField } from '../../../../../../components';

interface Props {
  action: WaitTriggerAction;
  setAction: (action: WaitTriggerAction) => void;
}

export const WaitEditor = ({ action, setAction }: Props) => {
  return (
    <Flex pad>
      <NumberField
        label="Wait"
        max={10000}
        value={action.millis}
        setValue={(newValue) => setAction(new WaitTriggerAction(newValue))}
      />
      milliseconds
    </Flex>
  );
};
