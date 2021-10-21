import React from 'react';

import { AppContext } from '..';
import { Trigger } from '../../types';

export const useGlobals = () => {
  const {
    globals,
    globals: { transposition, triggers, mapping },
    setGlobals
  } = React.useContext(AppContext);

  const setTransposition = (transposition: number) => setGlobals({ ...globals, transposition });

  const setTriggers = (triggers: Trigger[]) => setGlobals({ ...globals, triggers });

  const setMapping = (mapping: Record<number, number | 'none'>) => setGlobals({ ...globals, mapping });

  return {
    transposition,
    triggers,
    mapping,
    setTransposition,
    setTriggers,
    setMapping
  };
};
