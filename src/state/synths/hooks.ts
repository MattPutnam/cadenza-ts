import React from 'react';

import { AppContext } from '..';
import * as SynthUtils from '../../utils/synth-utils';
import { CRUD } from '../utils';

export const useSynthesizers = () => {
  const { synthesizers, setSynthesizers } = React.useContext(AppContext);

  const [addSynthesizer, deleteSynthesizer, updateSynthesizer] = CRUD(synthesizers, setSynthesizers);

  const allPatches = React.useMemo(() => {
    const resolution = SynthUtils.resolveSynthesizersAndPatches(synthesizers);
    return resolution.allPatches;
  }, [synthesizers]);

  const synthTree = React.useMemo(() => {
    const resolution = SynthUtils.resolveSynthesizersAndPatches(synthesizers);
    return resolution.synthTree;
  }, [synthesizers]);

  return { synthesizers, setSynthesizers, addSynthesizer, deleteSynthesizer, updateSynthesizer, allPatches, synthTree };
};
