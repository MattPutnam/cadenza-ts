import { Trigger, TriggerSequenceType, triggerSequenceTypes } from '../../../../../../types';
import { Flex, Select } from '../../../../../components';

interface Props {
  trigger: Trigger;
  setTrigger: (trigger: Trigger) => void;
}

export const TriggerType = ({ trigger, setTrigger }: Props) => {
  const { type } = trigger;

  const setSelected = (newType: TriggerSequenceType) => {
    setTrigger({ ...trigger, type: newType });
  };

  return (
    <Flex pad>
      <Select label="On:" options={triggerSequenceTypes} selected={type} setSelected={setSelected} />
    </Flex>
  );
};
