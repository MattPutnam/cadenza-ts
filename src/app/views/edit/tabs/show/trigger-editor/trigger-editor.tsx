import React from 'react';

import _ from 'lodash';

import { Trigger } from '../../../../../../types';
import { Container, Content, Flex, Header, List, ListItem, Placeholder, Title } from '../../../../../components';
import { Actions } from './actions';
import { Inputs } from './inputs';
import { SectionWrapper } from './section-wrapper';
import { TriggerType } from './trigger-type';

const summarize = (trigger: Trigger) => {
  const { inputs, actions, type } = trigger;

  const inputString = `[${inputs.map((input) => input.toString()).join(', ')}]`;
  const actionString = `[${actions.map((action) => action.toString()).join(', ')}]`;

  return `On ${type}: ${inputString} do: ${actionString}`;
};

interface Props {
  triggers: Trigger[];
  setTriggers: (triggers: Trigger[]) => void;
}

export const TriggerEditor = ({ triggers, setTriggers }: Props) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(undefined);

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
    <Container alternate collapse startCollapsed={noTriggers}>
      <Header buttons={[['add', addTrigger]]}>
        <Title>Triggers</Title>
      </Header>
      <Content>
        {noTriggers && <Placeholder>Click '+' to add a trigger</Placeholder>}
        <List selectedItem={selectedIndex} setSelectedItem={setSelectedIndex}>
          {triggers.map((trigger, index) => {
            return (
              <ListItem key={index} value={index}>
                {summarize(trigger)}
              </ListItem>
            );
          })}
        </List>
        {trigger && <Editor trigger={trigger} setSelectedTrigger={setSelectedTrigger} deleteSelf={deleteSelf} />}
      </Content>
    </Container>
  );
};

const Editor = ({ trigger, setSelectedTrigger, deleteSelf }) => {
  return (
    <SectionWrapper>
      <Container>
        <Header buttons={[['delete', deleteSelf]]}>
          <Title>Edit Trigger</Title>
        </Header>
        <Content>
          <TriggerType trigger={trigger} setTrigger={setSelectedTrigger} />
          <Inputs trigger={trigger} setTrigger={setSelectedTrigger} />
          <Flex pad>Do</Flex>
          <Actions trigger={trigger} setTrigger={setSelectedTrigger} />
        </Content>
      </Container>
    </SectionWrapper>
  );
};