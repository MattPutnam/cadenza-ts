import { ControlTriggerInput, TriggerInput } from '../../../../../../../types';
import { Flex, ControlSelect, NumberField, Placeholder } from '../../../../../../components';

interface Props {
  input: TriggerInput;
  setInput: (input: ControlTriggerInput) => void;
}

export const ControlEditor = ({ input, setInput }: Props) => {
  if (!(input instanceof ControlTriggerInput)) {
    return <Placeholder>Wrong input type</Placeholder>;
  }

  return (
    <Flex pad>
      <ControlSelect
        selected={input.controller}
        setSelected={(controller) => setInput(new ControlTriggerInput(controller, input.value))}
      />
      <NumberField
        label="at value"
        max={127}
        value={input.value}
        setValue={(value) => setInput(new ControlTriggerInput(input.controller, value))}
      />
    </Flex>
  );
};
