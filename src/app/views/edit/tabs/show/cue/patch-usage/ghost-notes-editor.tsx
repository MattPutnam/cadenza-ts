import React from 'react';

import _ from 'lodash';

import { useKeyboards } from '../../../../../../../state';
import { createSubKeyboard } from '../../../../../../../utils/keyboard-utils';
import { Center, Checkbox, Flex, KeyboardPanel, Spacer } from '../../../../../../components';
import { PatchUsageEditorProps } from './patch-usage-editor-props';
import { wrongType } from './wrong-type';

export const GhostNotesEditor = ({ patchUsage, setPatchUsage }: PatchUsageEditorProps) => {
  const { findKeyboard } = useKeyboards();
  const [selectedKey, setSelectedKey] = React.useState<number | undefined>(undefined);

  if (patchUsage.type !== 'ghost-notes') {
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

      setPatchUsage({ ...patchUsage, mappedNotes: newMapping });
    }
  };

  const keyboard = findKeyboard(patchUsage.keyboardId)!;
  const subKeyboard = createSubKeyboard(keyboard, patchUsage.range);

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
          onChange={(passthrough) => setPatchUsage({ ...patchUsage, passthrough })}
        />
      </Flex>
    </Center>
  );
};
