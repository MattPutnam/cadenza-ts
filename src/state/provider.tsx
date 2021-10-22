import React from 'react';

import { initialState, AppContext, State } from '.';
import { Globals, ActionPedal, KeyboardDefinition, SynthesizerConfig, PatchSelection, Song, Cue } from '../types';

export const AppStateProvider: React.FC = ({ children }) => {
  const [state, doSetState] = React.useState(initialState);

  const setState = (newState: Partial<State>) => doSetState({ ...state, ...newState });
  const setGlobals = (globals: Globals) => doSetState({ ...state, globals });
  const setActionPedal = (actionPedal?: ActionPedal) => doSetState({ ...state, actionPedal });
  const setKeyboards = (keyboards: KeyboardDefinition[]) => doSetState({ ...state, keyboards });
  const setSynthesizers = (synthesizers: SynthesizerConfig[]) => doSetState({ ...state, synthesizers });
  const setPatches = (patches: PatchSelection[]) => doSetState({ ...state, patches });
  const setSongs = (songs: Song[]) => doSetState({ ...state, songs });
  const setCues = (cues: Cue[]) => doSetState({ ...state, cues });

  const value = {
    ...state,
    setState,
    setGlobals,
    setActionPedal,
    setKeyboards,
    setSynthesizers,
    setPatches,
    setSongs,
    setCues
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
