import React from 'react';

import { AppContext } from '..';
import { CRUD } from '../utils';

export const usePatches = () => {
  const { patches, setPatches } = React.useContext(AppContext);

  const [addPatch, deletePatch, updatePatch] = CRUD(patches, setPatches);

  return { patches, setPatches, addPatch, deletePatch, updatePatch };
};
