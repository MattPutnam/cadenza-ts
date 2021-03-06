import React from 'react';

import { useKeyboards } from '../../../../../../../state';
import { printTriggerInput, Trigger, TriggerInput } from '../../../../../../../types';
import { Container, List, ListItem } from '../../../../../../components';
import { InputEditor } from './input-editor';

interface Props {
  trigger: Trigger;
  setTrigger: (trigger: Trigger) => void;
}

export const Inputs = ({ trigger, setTrigger }: Props) => {
  const { keyboards } = useKeyboards();

  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(undefined);
  const { inputs } = trigger;

  const input = selectedIndex === undefined ? undefined : inputs[selectedIndex];

  const addInput = () => {
    const newInput: TriggerInput = { type: 'key-press' };
    setTrigger({ ...trigger, inputs: [...trigger.inputs, newInput] });
    setSelectedIndex(trigger.inputs.length);
  };

  const deleteSelf = () => {
    const newInputs = [...inputs];
    newInputs.splice(selectedIndex!, 1);
    setTrigger({ ...trigger, inputs: newInputs });
    setSelectedIndex(undefined);
  };

  const moveUp = () => {
    const newInputs = [...inputs];
    const elem = newInputs[selectedIndex!];
    const prev = newInputs[selectedIndex! - 1];
    newInputs[selectedIndex! - 1] = elem;
    newInputs[selectedIndex!] = prev;
    setTrigger({ ...trigger, inputs: newInputs });
    setSelectedIndex(selectedIndex! - 1);
  };

  const moveDown = () => {
    const newInputs = [...inputs];
    const elem = newInputs[selectedIndex!];
    const next = newInputs[selectedIndex! + 1];
    newInputs[selectedIndex! + 1] = elem;
    newInputs[selectedIndex!] = next;
    setTrigger({ ...trigger, inputs: newInputs });
    setSelectedIndex(selectedIndex! + 1);
  };

  const setInput = (newInput: TriggerInput) => {
    const newInputs = [...inputs];
    newInputs[selectedIndex!] = newInput;
    setTrigger({ ...trigger, inputs: newInputs });
  };

  return (
    <Container alternate header={{ title: 'Inputs', buttons: [['add', addInput]] }}>
      <List selectedItem={selectedIndex} setSelectedItem={setSelectedIndex}>
        {inputs.map((input, index) => {
          return (
            <ListItem key={index} value={index}>
              {printTriggerInput(input, keyboards)}
            </ListItem>
          );
        })}
      </List>
      {input && (
        <InputEditor
          input={input}
          setInput={setInput}
          deleteSelf={deleteSelf}
          moveUp={selectedIndex! > 0 ? moveUp : undefined}
          moveDown={selectedIndex! < inputs.length - 1 ? moveDown : undefined}
        />
      )}
    </Container>
  );
};
