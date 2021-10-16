import React from 'react';

import _ from 'lodash';

import { AppContext } from '../../state';
import { PatchSelection } from '../../types';

export const usePatches = () => {
  const { patches, setPatches } = React.useContext(AppContext);

  const addPatch = (patch: PatchSelection) => {
    const newPatches = [...patches, patch];
    newPatches.sort((p1, p2) => p1.name.localeCompare(p2.name));
    setPatches(newPatches);
  };

  const deletePatch = (patch: PatchSelection) => {
    const newPatches = [...patches];
    _.remove(newPatches, { id: patch.id });
    setPatches(newPatches);
  };

  const updatePatch = (patchId: number, props: Partial<PatchSelection>) => {
    const newPatches = [...patches];
    const patchIndex = _.findIndex(patches, { id: patchId });
    newPatches[patchIndex] = { ...newPatches[patchIndex], ...props };
    setPatches(newPatches);
  };

  return { patches, setPatches, addPatch, deletePatch, updatePatch };
};
