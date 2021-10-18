import React from 'react';

import { initialState, AppContext } from '.';
import { ActionPedal, KeyboardDefinition, SynthesizerConfig, PatchSelection } from '../types';

export const AppStateProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(initialState);

  const setActionPedal = (actionPedal?: ActionPedal) => setState({ ...state, actionPedal });
  const setKeyboards = (keyboards: KeyboardDefinition[]) => setState({ ...state, keyboards });
  const setSynthesizers = (synthesizers: SynthesizerConfig[]) => setState({ ...state, synthesizers });
  const setPatches = (patches: PatchSelection[]) => setState({ ...state, patches });

  const value = {
    ...state,
    setActionPedal,
    setKeyboards,
    setSynthesizers,
    setPatches
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
