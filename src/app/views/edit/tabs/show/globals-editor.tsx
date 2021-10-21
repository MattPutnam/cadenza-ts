import { useGlobals } from '../../../../../state';
import { Container, Content, ControlMapper, Header, Title, Transpose } from '../../../../components';
import { TriggerEditor } from './trigger-editor';

export const GlobalsEditor = () => {
  const { transposition, setTransposition, triggers, setTriggers, mapping, setMapping } = useGlobals();

  return (
    <Container marginCollapse="left">
      <Header>
        <Title>Edit global settings</Title>
      </Header>
      <Content>
        <Transpose alternate transposition={transposition} setTransposition={setTransposition} />
        <TriggerEditor triggers={triggers} setTriggers={setTriggers} />
        <ControlMapper alternate mapping={mapping} setMapping={setMapping} />
      </Content>
    </Container>
  );
};
