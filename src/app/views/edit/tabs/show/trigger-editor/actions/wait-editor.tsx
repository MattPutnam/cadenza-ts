import { TriggerAction } from '../../../../../../../types';
import { Flex, NumberField, Placeholder } from '../../../../../../components';

interface Props {
  action: TriggerAction;
  setAction: (action: TriggerAction) => void;
}

export const WaitEditor = ({ action, setAction }: Props) => {
  if (action.type !== 'wait') {
    return <Placeholder>Wrong action type</Placeholder>;
  }

  return (
    <Flex pad>
      <NumberField
        label="Wait"
        max={10000}
        value={action.millis}
        setValue={(millis) => setAction({ ...action, millis })}
      />
      milliseconds
    </Flex>
  );
};
