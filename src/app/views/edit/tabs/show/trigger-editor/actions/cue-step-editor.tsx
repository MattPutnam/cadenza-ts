import { TriggerAction } from '../../../../../../../types';
import { Placeholder, RadioButton, RadioButtonGroup } from '../../../../../../components';

interface Props {
  action: TriggerAction;
  setAction: (action: TriggerAction) => void;
}

export const CueStepEditor = ({ action, setAction }: Props) => {
  if (action.type !== 'step') {
    return <Placeholder>Wrong action type</Placeholder>;
  }

  const selected = action.reverse ? 1 : 0;
  const setSelected = (index: number) => {
    if (index === 0) {
      setAction({ ...action, reverse: false });
    } else if (index === 1) {
      setAction({ ...action, reverse: true });
    }
  };

  return (
    <RadioButtonGroup selected={selected} setSelected={setSelected}>
      <RadioButton>Advance to the next cue</RadioButton>
      <RadioButton>Go back to the previous cue</RadioButton>
    </RadioButtonGroup>
  );
};
