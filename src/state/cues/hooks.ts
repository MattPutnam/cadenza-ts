import React from 'react';

import { AppContext } from '..';
import { CRUD } from '../utils';

export const useCues = () => {
  const { cues, setCues } = React.useContext(AppContext);

  const [createCue, findCue, updateCue, deleteCue, addCues, deleteCues] = CRUD(cues, setCues);

  return { cues, setCues, createCue, findCue, updateCue, deleteCue, addCues, deleteCues };
};
