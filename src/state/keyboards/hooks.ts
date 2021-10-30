import React from 'react';

import _ from 'lodash';

import { AppContext } from '..';
import { CRUD } from '../utils';

export const useKeyboards = () => {
  const { keyboards, setKeyboards, globals, songs, cues } = React.useContext(AppContext);

  const [createKeyboard, findKeyboard, updateKeyboard, deleteKeyboard] = CRUD(keyboards, setKeyboards);

  const isInUse = (keyboardId: number): boolean => {
    const allTriggers = [
      ...globals.triggers,
      ..._.flatMap(songs, (song) => song.triggers),
      ..._.flatMap(cues, (cue) => cue.triggers)
    ];

    const allTriggerInputs = allTriggers.flatMap((trigger) => trigger.inputs);

    if (_.some(allTriggerInputs, (input) => input.type === 'key-press' && input.keyboardId === keyboardId)) {
      return true;
    }

    const allPatchUsages = _.flatMap(cues, (cue) => cue.patchUsages);

    if (_.some(allPatchUsages, (pu) => pu.keyboardId === keyboardId)) {
      return true;
    }

    return false;
  };

  return { keyboards, setKeyboards, createKeyboard, findKeyboard, updateKeyboard, deleteKeyboard, isInUse };
};
