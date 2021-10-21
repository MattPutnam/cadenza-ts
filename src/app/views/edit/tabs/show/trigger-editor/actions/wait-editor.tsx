import { TriggerAction, WaitTriggerAction } from '../../../../../../../types';
import { Flex, NumberField, Placeholder } from '../../../../../../components';

interface Props {
  action: TriggerAction;
  setAction: (action: WaitTriggerAction) => void;
}

export const WaitEditor = ({ action, setAction }: Props) => {
  if (!(action instanceof WaitTriggerAction)) {
    return <Placeholder>Wrong action type</Placeholder>;
  }

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
