import { Flex } from '..';
import { disableArg, noControls } from '../../../storybook-components';
import { Container } from './container';

export default {
  title: 'Components / Container',
  component: Container,
  argTypes: {
    collapse: 'boolean',
    alternate: 'boolean',
    showButtonsOnCollapsed: 'boolean',
    header: disableArg,
    startCollapsed: disableArg,
    flex: disableArg,
    marginCollapse: disableArg
  }
};

export const Basic = ({ collapse, startCollapsed, alternate, showButtonsOnCollapsed }) => (
  <Container
    header={{
      title: 'Header text',
      buttons: [
        ['add', () => {}],
        ['delete', () => {}]
      ],
      showButtonsOnCollapsed
    }}
    collapse={collapse}
    startCollapsed={startCollapsed}
    alternate={alternate}
  >
    This is the content
  </Container>
);

export const Nested = noControls(() => (
  <Container collapse header={{ title: 'Parent container' }}>
    <Container collapse alternate header={{ title: 'Child container' }}>
      Nested content!
    </Container>
  </Container>
));

export const Sibling = noControls(() => (
  <Flex>
    <Flex column>
      <Container collapse header={{ title: 'Collapse 1' }}>
        Foo
      </Container>
      <Container collapse marginCollapse="top" header={{ title: 'Collapse 2' }}>
        Foo
      </Container>
      <Container collapse marginCollapse="top" header={{ title: 'Collapse 3' }}>
        Foo
      </Container>
    </Flex>
    <Container collapse marginCollapse="left" header={{ title: 'Collapse 4' }}>
      Foo
    </Container>
  </Flex>
));
