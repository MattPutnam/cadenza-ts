import _ from 'lodash';

import { KeyboardDefinition, LocationNumber, printLocation, Song } from '..';
import * as Midi from '../../midi';

type KeyPressTriggerInput = {
  type: 'key-press';
  key?: number; // optional because it needs to be set first
  keyboardId?: number; // optional because it needs to be set first
};

type ControlTriggerInput = {
  type: 'control';
  controller: number;
  value: number;
};

export type TriggerInput = KeyPressTriggerInput | ControlTriggerInput;

export const printTriggerInput = (triggerInput: TriggerInput, keyboards: KeyboardDefinition[]): string => {
  if (triggerInput.type === 'key-press') {
    const keyName = triggerInput.key ? Midi.midiNoteNumberToName(triggerInput.key) : '[unset key]';
    if (keyboards.length === 1) {
      return keyName;
    } else {
      const index = _.findIndex(keyboards, { id: triggerInput.keyboardId });
      return `${keyName} on kbd ${index + 1}`;
    }
  } else if (triggerInput.type === 'control') {
    return `${Midi.shortCCName(triggerInput.controller)}@${triggerInput.value}`;
  } else {
    return 'unknown';
  }
};

type StepTriggerAction = {
  type: 'step';
  reverse: boolean;
};

type GotoTriggerAction = {
  type: 'goto';
  songId: number;
  measure: LocationNumber;
};

type WaitTriggerAction = {
  type: 'wait';
  millis: number;
};

type PanicTriggerAction = {
  type: 'panic';
};

export type TriggerAction = StepTriggerAction | GotoTriggerAction | WaitTriggerAction | PanicTriggerAction;

export const printTriggerAction = (triggerAction: TriggerAction, songs: Song[]): string => {
  if (triggerAction.type === 'step') {
    return triggerAction.reverse ? 'Prev cue' : 'Next cue';
  } else if (triggerAction.type === 'goto') {
    const song = _.find(songs, { id: triggerAction.songId });
    if (song) {
      return `Go to #${printLocation(song.location)} m. ${printLocation(triggerAction.measure)}`;
    } else {
      return `Go to undefined song`;
    }
  } else if (triggerAction.type === 'wait') {
    return `Wait ${triggerAction.millis}ms`;
  } else if (triggerAction.type === 'panic') {
    return 'Panic';
  } else {
    return 'unknown';
  }
};

export type TriggerSequenceType = 'any of' | 'all of' | 'all in sequence';
export const triggerSequenceTypes = ['any of', 'all of', 'all in sequence'] as TriggerSequenceType[];

export interface Trigger {
  inputs: TriggerInput[];
  type: TriggerSequenceType;
  actions: TriggerAction[];
}

export interface HasTriggers {
  triggers: Trigger[];
}
