import React from 'react';

import { AppContext } from '..';
import { CRUD } from '../utils';

export const useCues = () => {
  const { cues, setCues } = React.useContext(AppContext);

  const [addCue, deleteCue, updateCue, addCues, deleteCues] = CRUD(cues, setCues);

  return { cues, setCues, addCue, deleteCue, updateCue, addCues, deleteCues };
};
