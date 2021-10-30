import { Checkbox, Container, Flex } from '../../../../../../components';
import { PatchUsageEditorProps } from './patch-usage-editor-props';
import { wrongType } from './wrong-type';

export const NormalEditor = ({ patchUsage, setPatchUsage }: PatchUsageEditorProps) => {
  if (patchUsage.type !== 'normal') {
    return wrongType;
  }

  return (
    <Container alternate>
      <Flex pad>
        <Checkbox
          label="Monophonic"
          checked={patchUsage.monophonic}
          onChange={(monophonic) => setPatchUsage({ ...patchUsage, monophonic })}
        />
      </Flex>
    </Container>
  );
};
