import React from 'react';

import { State } from '.';
import { ActionPedalActions } from './action-pedal/actions';
import { CuesActions } from './cues/actions';
import { GlobalsActions } from './globals/actions';
import { KeyboardActions } from './keyboards/actions';
import { PatchesActions } from './patches/actions';
import { SongsActions } from './songs/actions';
import { SynthesizerActions } from './synths/actions';

type AppState = State &
  GlobalsActions &
  ActionPedalActions &
  KeyboardActions &
  SongsActions &
  SynthesizerActions &
  PatchesActions &
  CuesActions;

export const AppContext = React.createContext({} as AppState);
