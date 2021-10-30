import React from 'react';

import _ from 'lodash';

import { AppContext } from '..';
import { Cue } from '../../types';
import { findId } from '../../utils/id';
import { CRUD } from '../utils';
import { generateNext } from './../../types/location';

export const useCues = () => {
  const { cues, setCues, patches, songs, setState } = React.useContext(AppContext);

  const [createCue, findCue, updateCue, deleteCue, addCues, deleteCues] = CRUD(cues, setCues);

  const canCreateCue = (): boolean => {
    return patches.length > 0 && songs.length > 0;
  };

  const cloneCue = (cueId: number) => {
    const cue = findCue(cueId);
    if (!cue) return;

    const newLocation = generateNext(
      cue.location,
      cues.map((cue) => cue.location)
    );
    const newCueId = findId(cues);
    const newCue: Cue = {
      id: newCueId,
      patchUsages: _.cloneDeep(cue.patchUsages),
      triggers: _.cloneDeep(cue.triggers),
      songId: cue.songId,
      location: newLocation,
      transposition: 0,
      mapping: {}
    };

    setState({ cues: [...cues, newCue] });
    return newCueId;
  };

  return { cues, setCues, createCue, findCue, updateCue, deleteCue, addCues, deleteCues, canCreateCue, cloneCue };
};
