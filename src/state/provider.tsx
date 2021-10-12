import React from 'react';

import { initialState, AppContext } from '.';
import { ActionPedal, Keyboard } from '../types';

export const AppStateProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(initialState);

  const setActionPedal = (actionPedal?: ActionPedal) => setState({ ...state, actionPedal });
  const setKeyboards = (keyboards: Keyboard[]) => setState({ ...state, keyboards });

  const value = {
    ...state,
    setActionPedal,
    setKeyboards
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
