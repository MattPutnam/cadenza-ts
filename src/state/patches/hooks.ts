import React from 'react';

import _ from 'lodash';

import { AppContext } from '..';
import { CRUD } from '../utils';

export const usePatches = () => {
  const { patches, setPatches, cues } = React.useContext(AppContext);

  const [createPatch, findPatch, updatePatch, deletePatch] = CRUD(patches, setPatches);

  const isInUse = (patchId: number): boolean => {
    return _.some(cues, (cue) => {
      return _.some(cue.patchUsages, (patchUsage) => {
        return patchUsage.patchId === patchId;
      });
    });
  };

  return { patches, setPatches, createPatch, findPatch, updatePatch, deletePatch, isInUse };
};
