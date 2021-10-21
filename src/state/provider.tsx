import React from 'react';

import { initialState, AppContext } from '.';
import { Globals, ActionPedal, KeyboardDefinition, SynthesizerConfig, PatchSelection, Song, Cue } from '../types';

export const AppStateProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(initialState);

  const setGlobals = (globals: Globals) => setState({ ...state, globals });
  const setActionPedal = (actionPedal?: ActionPedal) => setState({ ...state, actionPedal });
  const setKeyboards = (keyboards: KeyboardDefinition[]) => setState({ ...state, keyboards });
  const setSynthesizers = (synthesizers: SynthesizerConfig[]) => setState({ ...state, synthesizers });
  const setPatches = (patches: PatchSelection[]) => setState({ ...state, patches });
  const setSongs = (songs: Song[]) => setState({ ...state, songs });
  const setCues = (cues: Cue[]) => setState({ ...state, cues });

  const value = {
    ...state,
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
