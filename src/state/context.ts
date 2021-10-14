import React from 'react';

import { State } from '.';
import { ActionPedalActions } from './action-pedal/actions';
import { KeyboardActions } from './keyboards/actions';
import { SynthesizerActions } from './synths/actions';

type AppState = State & ActionPedalActions & KeyboardActions & SynthesizerActions;

export const AppContext = React.createContext({} as AppState);
