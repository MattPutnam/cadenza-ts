import { ControlTriggerInput } from '../../../../../../../types';
import { Flex, ControlSelect, NumberField } from '../../../../../../components';

interface Props {
  input: ControlTriggerInput;
  setInput: (input: ControlTriggerInput) => void;
}

export const ControlEditor = ({ input, setInput }: Props) => {
  return (
    <Flex pad>
      <ControlSelect selected={input.controller} setSelected={(controller) => setInput({ ...input, controller })} />
      <NumberField label="at value" max={127} value={input.value} setValue={(value) => setInput({ ...input, value })} />
    </Flex>
  );
};
