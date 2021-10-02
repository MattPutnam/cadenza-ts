import React from 'react';

import { Container } from '../container';
import { List as ListComponent } from './list';
import { ListItem } from './list-item';
import { ListSection } from './list-section';

export default {
  title: 'Components / List'
};

export const List = () => {
  const [selectedItem, setSelectedItem] = React.useState<string | undefined>('Apple');

  return (
    <Container>
      <ListComponent selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
        <ListItem value={'Apple'}>Apple</ListItem>
        <ListItem value={'Banana'}>Banana</ListItem>
        <ListItem value={'Orange'}>Orange</ListItem>
      </ListComponent>
    </Container>
  );
};

export const ListWithSections = () => {
  const [selectedItem, setSelectedItem] = React.useState<string | undefined>('Dog');

  return (
    <Container>
      <ListComponent selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
        <ListSection title="Mammals" value="Mammals">
          <ListItem value="Dog">Dog</ListItem>
          <ListItem value="Cat">Cat</ListItem>
          <ListItem value="Cow">Cow</ListItem>
        </ListSection>
        <ListSection title="Reptiles" value="Reptiles">
          <ListItem value="Alligator">Alligator</ListItem>
          <ListItem value="Snake">Snake</ListItem>
          <ListItem value="Lizard">Lizard</ListItem>
        </ListSection>
      </ListComponent>
    </Container>
  );
};
