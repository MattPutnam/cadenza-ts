import React from 'react';

import { AppContext } from '..';
import { CRUD } from '../utils';

export const useCues = () => {
  const { cues, setCues, patches, songs } = React.useContext(AppContext);

  const [createCue, findCue, updateCue, deleteCue, addCues, deleteCues] = CRUD(cues, setCues);

  const canCreateCue = (): boolean => {
    return patches.length > 0 && songs.length > 0;
  };

  return { cues, setCues, createCue, findCue, updateCue, deleteCue, addCues, deleteCues, canCreateCue };
};
