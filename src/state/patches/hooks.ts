import React from 'react';

import { AppContext } from '..';
import { CRUD } from '../utils';

export const usePatches = () => {
  const { patches, setPatches } = React.useContext(AppContext);

  const [createPatch, findPatch, updatePatch, deletePatch] = CRUD(patches, setPatches);

  return { patches, setPatches, createPatch, findPatch, updatePatch, deletePatch };
};
