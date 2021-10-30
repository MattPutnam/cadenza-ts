import { useGlobals } from '../../../../../state';
import { Container, ControlMapper, Transpose } from '../../../../components';
import { TriggerEditor } from './trigger-editor';

export const GlobalsEditor = () => {
  const { transposition, setTransposition, triggers, setTriggers, mapping, setMapping } = useGlobals();

  return (
    <Container marginCollapse="left">
      <Transpose alternate transposition={transposition} setTransposition={setTransposition} />
      <TriggerEditor triggers={triggers} setTriggers={setTriggers} />
      <ControlMapper alternate mapping={mapping} setMapping={setMapping} />
    </Container>
  );
};
