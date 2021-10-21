import { StepTriggerAction } from '../../../../../../../types';
import { RadioButton, RadioButtonGroup } from '../../../../../../components';

interface Props {
  action: StepTriggerAction;
  setAction: (action: StepTriggerAction) => void;
}

export const CueStepEditor = ({ action, setAction }: Props) => {
  const selected = action.reverse ? 1 : 0;
  const setSelected = (index: number) => {
    if (index === 0) {
      setAction(new StepTriggerAction(false));
    } else if (index === 1) {
      setAction(new StepTriggerAction(true));
    }
  };

  return (
    <RadioButtonGroup selected={selected} setSelected={setSelected}>
      <RadioButton>Advance to the next cue</RadioButton>
      <RadioButton>Go back to the previous cue</RadioButton>
    </RadioButtonGroup>
  );
};
