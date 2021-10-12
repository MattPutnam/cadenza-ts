import React from 'react';

import { State } from '.';
import { ActionPedalActions } from './action-pedal/actions';
import { KeyboardActions } from './keyboards/actions';

type AppState = State & ActionPedalActions & KeyboardActions;

export const AppContext = React.createContext({} as AppState);
