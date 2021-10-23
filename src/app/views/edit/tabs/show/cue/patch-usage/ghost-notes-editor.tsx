import React from 'react';

import _ from 'lodash';

import { useKeyboards } from '../../../../../../../state';
import { GhostNotesPatchUsage, toClosed } from '../../../../../../../types';
import { createSubKeyboard } from '../../../../../../../utils/keyboard-utils';
import { Center, Checkbox, Flex, KeyboardPanel, Spacer } from '../../../../../../components';
import { PatchUsageEditorProps } from './patch-usage-editor-props';
import { wrongType } from './wrong-type';

export const GhostNotesEditor = ({ patchUsage, setPatchUsage }: PatchUsageEditorProps) => {
  const { keyboards } = useKeyboards();
  const [selectedKey, setSelectedKey] = React.useState<number | undefined>(undefined);

  if (!(patchUsage instanceof GhostNotesPatchUsage)) {
    return wrongType;
  }

  const { mappedNotes, passthrough } = patchUsage;

  const updateMapping = (key: number) => {
    if (selectedKey) {
      let mappingForSelectedKey = new Set(mappedNotes[selectedKey] || []);

      if (mappingForSelectedKey.has(key)) {
        mappingForSelectedKey.delete(key);
      } else {
        mappingForSelectedKey.add(key);
      }

      const newMapping = { ...mappedNotes, [selectedKey]: Array.from(mappingForSelectedKey) };

      setPatchUsage(patchUsage.clone(newMapping, patchUsage.passthrough));
    }
  };

  const keyboard = _.find(keyboards, { id: patchUsage.keyboardId })!;
  const subKeyboard = createSubKeyboard(keyboard, toClosed(patchUsage.range));

  const sourceHighlight = _.keys(mappedNotes).map((x) => parseInt(x, 10));
  const destHighlight = (selectedKey && mappedNotes[selectedKey]) || [];

  return (
    <Center pad>
      <Flex column>
        When this note is pressed:
        <Flex>
          <Spacer width={subKeyboard.offsetLeft} />
          <KeyboardPanel
            keyboard={subKeyboard.keyboard}
            highlightKeys={selectedKey ? [selectedKey] : undefined}
            lightHighlightKeys={sourceHighlight}
            onKeyClick={setSelectedKey}
          />
        </Flex>
        Sound these notes:
        <KeyboardPanel keyboard={keyboard} highlightKeys={destHighlight} onKeyClick={updateMapping} />
        <Checkbox
          label="Pass through non-mapped notes"
          checked={passthrough}
          onChange={(passthrough) => setPatchUsage(patchUsage.clone(patchUsage.mappedNotes, passthrough))}
        />
      </Flex>
    </Center>
  );
};
