import React from 'react';

import { useSongs } from '../../../../../../../state';
import { printTriggerAction, Trigger, TriggerAction } from '../../../../../../../types';
import { Container, List, ListItem } from '../../../../../../components';
import { ActionEditor } from './action-editor';

interface Props {
  trigger: Trigger;
  setTrigger: (trigger: Trigger) => void;
}

export const Actions = ({ trigger, setTrigger }: Props) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(undefined);
  const { songs } = useSongs();
  const { actions } = trigger;

  const action = selectedIndex === undefined ? undefined : actions[selectedIndex];

  const addAction = () => {
    const newAction: TriggerAction = { type: 'step', reverse: false };
    setTrigger({ ...trigger, actions: [...trigger.actions, newAction] });
    setSelectedIndex(trigger.actions.length);
  };

  const deleteSelf = () => {
    const newActions = [...actions];
    newActions.splice(selectedIndex!, 1);
    setTrigger({ ...trigger, actions: newActions });
    setSelectedIndex(undefined);
  };

  const moveUp = () => {
    const newActions = [...actions];
    const elem = newActions[selectedIndex!];
    const prev = newActions[selectedIndex! - 1];
    newActions[selectedIndex! - 1] = elem;
    newActions[selectedIndex!] = prev;
    setTrigger({ ...trigger, actions: newActions });
    setSelectedIndex(selectedIndex! - 1);
  };

  const moveDown = () => {
    const newActions = [...actions];
    const elem = newActions[selectedIndex!];
    const next = newActions[selectedIndex! + 1];
    newActions[selectedIndex! + 1] = elem;
    newActions[selectedIndex!] = next;
    setTrigger({ ...trigger, actions: newActions });
    setSelectedIndex(selectedIndex! + 1);
  };

  const setAction = (newAction: TriggerAction) => {
    const newActions = [...actions];
    newActions[selectedIndex!] = newAction;
    setTrigger({ ...trigger, actions: newActions });
  };

  return (
    <Container alternate header={{ title: 'Actions', buttons: [['add', addAction]] }}>
      <List selectedItem={selectedIndex} setSelectedItem={setSelectedIndex}>
        {actions.map((action, index) => {
          return (
            <ListItem key={index} value={index}>
              {printTriggerAction(action, songs)}
            </ListItem>
          );
        })}
      </List>
      {action && (
        <ActionEditor
          action={action}
          setAction={setAction}
          deleteSelf={deleteSelf}
          moveUp={selectedIndex! > 0 ? moveUp : undefined}
          moveDown={selectedIndex! < actions.length - 1 ? moveDown : undefined}
        />
      )}
    </Container>
  );
};
