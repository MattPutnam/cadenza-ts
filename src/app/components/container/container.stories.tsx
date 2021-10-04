import { Flex } from '..';
import { disableArg, noControls } from '../../../storybook-components';
import { Container } from './container';
import { Content } from './content';
import { Header } from './header';
import { Title } from './title';

export default {
  title: 'Components / Container',
  component: Container,
  argTypes: {
    collapse: 'boolean',
    alternate: 'boolean',
    startCollapsed: disableArg,
    flex: disableArg,
    marginCollapse: disableArg
  }
};

export const Basic = ({ collapse, startCollapsed, alternate }) => (
  <Container collapse={collapse} startCollapsed={startCollapsed} alternate={alternate}>
    <Header
      buttons={[
        ['add', () => {}],
        ['delete', () => {}]
      ]}
    >
      <Title>Header text</Title>
    </Header>
    <Content>This is the content</Content>
  </Container>
);

export const Nested = noControls(() => (
  <Container collapse>
    <Header>
      <Title>Parent container</Title>
    </Header>
    <Content>
      <Container collapse alternate>
        <Header>
          <Title>Child container</Title>
        </Header>
        <Content>Nested content!</Content>
      </Container>
    </Content>
  </Container>
));

export const Sibling = noControls(() => (
  <Flex>
    <Flex column>
      <Container collapse>
        <Header>
          <Title>Collapse 1</Title>
        </Header>
        <Content>Foo</Content>
      </Container>
      <Container collapse marginCollapse="top">
        <Header>
          <Title>Collapse 2</Title>
        </Header>
        <Content>Foo</Content>
      </Container>
      <Container collapse marginCollapse="top">
        <Header>
          <Title>Collapse 3</Title>
        </Header>
        <Content>Foo</Content>
      </Container>
    </Flex>
    <Container collapse marginCollapse="left">
      <Header>
        <Title>Collapse 4</Title>
      </Header>
      <Content>Foo</Content>
    </Container>
  </Flex>
));
