import { StepTriggerAction, TriggerAction } from '../../../../../../../types';
import { Placeholder, RadioButton, RadioButtonGroup } from '../../../../../../components';

interface Props {
  action: TriggerAction;
  setAction: (action: StepTriggerAction) => void;
}

export const CueStepEditor = ({ action, setAction }: Props) => {
  if (!(action instanceof StepTriggerAction)) {
    return <Placeholder>Wrong action type</Placeholder>;
  }

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
