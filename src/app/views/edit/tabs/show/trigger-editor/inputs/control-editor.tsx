import { TriggerInput } from '../../../../../../../types';
import { Flex, ControlSelect, NumberField, Placeholder } from '../../../../../../components';

interface Props {
  input: TriggerInput;
  setInput: (input: TriggerInput) => void;
}

export const ControlEditor = ({ input, setInput }: Props) => {
  if (input.type !== 'control') {
    return <Placeholder>Wrong input type</Placeholder>;
  }

  return (
    <Flex pad>
      <ControlSelect selected={input.controller} setSelected={(controller) => setInput({ ...input, controller })} />
      <NumberField label="at value" max={127} value={input.value} setValue={(value) => setInput({ ...input, value })} />
    </Flex>
  );
};
