import React from 'react';

import _ from 'lodash';

import { AppContext } from '..';
import * as SynthUtils from '../../utils/synth-utils';
import { CRUD } from '../utils';

export const useSynthesizers = () => {
  const { synthesizers, setSynthesizers, patches } = React.useContext(AppContext);

  const [createSynthesizer, findSynthesizer, updateSynthesizer, deleteSynthesizer] = CRUD(
    synthesizers,
    setSynthesizers
  );

  const isInUse = (synthesizerId: number): boolean => {
    return _.some(patches, { synthesizerId });
  };

  const allPatches = React.useMemo(() => {
    const resolution = SynthUtils.resolveSynthesizersAndPatches(synthesizers);
    return resolution.allPatches;
  }, [synthesizers]);

  const synthTree = React.useMemo(() => {
    const resolution = SynthUtils.resolveSynthesizersAndPatches(synthesizers);
    return resolution.synthTree;
  }, [synthesizers]);

  return {
    synthesizers,
    setSynthesizers,
    createSynthesizer,
    findSynthesizer,
    updateSynthesizer,
    deleteSynthesizer,
    isInUse,
    allPatches,
    synthTree
  };
};
