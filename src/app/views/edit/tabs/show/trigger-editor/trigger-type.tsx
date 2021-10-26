import { Trigger, TriggerSequenceType, triggerSequenceTypes } from '../../../../../../types';
import { Select } from '../../../../../components';

interface Props {
  trigger: Trigger;
  setTrigger: (trigger: Trigger) => void;
}

export const TriggerType = ({ trigger, setTrigger }: Props) => {
  const { type } = trigger;

  const setSelected = (newType: TriggerSequenceType) => {
    setTrigger({ ...trigger, type: newType });
  };

  return <Select label="Type:" options={triggerSequenceTypes} selected={type} setSelected={setSelected} />;
};
