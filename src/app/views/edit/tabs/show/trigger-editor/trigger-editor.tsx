import React from 'react';

import _ from 'lodash';

import { useKeyboards, useSongs } from '../../../../../../state';
import { KeyboardDefinition, printTriggerAction, printTriggerInput, Song, Trigger } from '../../../../../../types';
import {
  Container,
  ContainerProps,
  Content,
  Header,
  List,
  ListItem,
  Placeholder,
  Title
} from '../../../../../components';
import { Actions } from './actions';
import { Inputs } from './inputs';
import { SectionWrapper } from './section-wrapper';
import { TriggerType } from './trigger-type';

const summarize = (trigger: Trigger, keyboards: KeyboardDefinition[], songs: Song[]) => {
  const { inputs, actions, type } = trigger;

  if (inputs.length === 0) {
    return '[No inputs]';
  }
  if (actions.length === 0) {
    return '[No action]';
  }

  const inputString =
    inputs.length === 1
      ? printTriggerInput(inputs[0], keyboards)
      : `[${inputs.map((input) => printTriggerInput(input, keyboards)).join(', ')}]`;
  const actionString =
    actions.length === 1
      ? printTriggerAction(actions[0], songs)
      : `[${actions.map((action) => printTriggerAction(action, songs)).join(', ')}]`;
  const typeString = inputs.length > 1 ? ` ${type}` : '';

  return `On${typeString}: ${inputString} do: ${actionString}`;
};

interface Props extends ContainerProps {
  triggers: Trigger[];
  setTriggers: (triggers: Trigger[]) => void;
}

export const TriggerEditor = ({ triggers, setTriggers, ...containerProps }: Props) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(undefined);
  const { keyboards } = useKeyboards();
  const { songs } = useSongs();

  const trigger = selectedIndex === undefined ? undefined : triggers[selectedIndex];
  const noTriggers = _.isEmpty(triggers);

  const addTrigger = () => {
    const newTrigger: Trigger = {
      type: 'any of',
      inputs: [],
      actions: []
    };

    setTriggers([...triggers, newTrigger]);
    setSelectedIndex(triggers.length);
  };

  const setSelectedTrigger = (newValue: Trigger) => {
    const newTriggers = [...triggers];
    newTriggers[selectedIndex!] = newValue;
    setTriggers(newTriggers);
  };

  const deleteSelf = () => {
    const newTriggers = [...triggers];
    newTriggers.splice(selectedIndex!, 1);
    setSelectedIndex(undefined);
    setTriggers(newTriggers);
  };

  return (
    <Container alternate collapse startCollapsed={noTriggers} {...containerProps}>
      <Header buttons={[['add', addTrigger]]}>
        <Title>Triggers</Title>
      </Header>
      <Content>
        {noTriggers && <Placeholder>Click '+' to add a trigger</Placeholder>}
        <List selectedItem={selectedIndex} setSelectedItem={setSelectedIndex}>
          {triggers.map((trigger, index) => {
            return (
              <ListItem key={index} value={index}>
                {summarize(trigger, keyboards, songs)}
              </ListItem>
            );
          })}
        </List>
        {trigger && <Editor trigger={trigger} setSelectedTrigger={setSelectedTrigger} deleteSelf={deleteSelf} />}
      </Content>
    </Container>
  );
};

interface EditorProps {
  trigger: Trigger;
  setSelectedTrigger: (trigger: Trigger) => void;
  deleteSelf: () => void;
}

const Editor = ({ trigger, setSelectedTrigger, deleteSelf }: EditorProps) => {
  return (
    <SectionWrapper>
      <Container>
        <Header buttons={[['delete', deleteSelf]]}>
          <Title>Edit Trigger</Title>
          {trigger.inputs.length > 1 && <TriggerType trigger={trigger} setTrigger={setSelectedTrigger} />}
        </Header>
        <Content>
          <Inputs trigger={trigger} setTrigger={setSelectedTrigger} />
          <Actions trigger={trigger} setTrigger={setSelectedTrigger} />
        </Content>
      </Container>
    </SectionWrapper>
  );
};
