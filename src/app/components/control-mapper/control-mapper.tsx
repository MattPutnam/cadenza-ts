import React from 'react';

import _ from 'lodash';

import {
  Button,
  Container,
  Content,
  ControlOrNoneSelect,
  ControlSelect,
  Flex,
  Header,
  icon,
  Placeholder,
  Title
} from '..';

interface Props {
  mapping: Record<number, number | 'none'>;
  setMapping: (newMapping: Record<number, number | 'none'>) => void;
  alternate?: boolean;
}

export const ControlMapper: React.FC<Props> = ({ mapping, setMapping, alternate }) => {
  const updateKey = React.useCallback(
    (oldKey: number, newKey: number) => {
      const value = mapping[oldKey];
      const newMapping = { ...mapping };
      delete newMapping[oldKey];
      newMapping[newKey] = value;
      setMapping(newMapping);
    },
    [mapping, setMapping]
  );

  const updateValue = React.useCallback(
    (key: number, newValue: number | 'none') => {
      setMapping({ ...mapping, [key]: newValue });
    },
    [mapping, setMapping]
  );

  const remove = React.useCallback(
    (key: number) => {
      const newMapping = { ...mapping };
      delete newMapping[key];
      setMapping(newMapping);
    },
    [mapping, setMapping]
  );

  const addNew = React.useCallback(() => {
    let candidate = 0;
    while (_.has(mapping, candidate)) {
      candidate++;
    }

    updateValue(candidate, candidate);
  }, [mapping, updateValue]);

  return (
    <Container alternate={alternate} flex="none" collapse startCollapsed={_.isEmpty(mapping)}>
      <Header buttons={[['add', addNew]]}>
        <Title>Map controls</Title>
      </Header>
      <Content>
        <Flex column pad>
          {_.isEmpty(mapping) && <Placeholder>Click &apos;+&apos; to add a mapping</Placeholder>}
          {_.toPairs(mapping).map(([k, value]) => {
            const key = parseInt(k, 10);
            return (
              <Flex pad align="center" key={key}>
                <ControlSelect selected={key} setSelected={(newKey) => updateKey(key, newKey)} />
                {icon('treeSeparator', { style: { marginRight: '0.5rem' } })}
                <ControlOrNoneSelect selected={value} setSelected={(newValue) => updateValue(key, newValue)} />
                <Button onClick={() => remove(key)}>Delete</Button>
              </Flex>
            );
          })}
        </Flex>
      </Content>
    </Container>
  );
};
