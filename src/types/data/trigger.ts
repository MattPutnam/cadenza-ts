import { LocationNumber } from '..';
import * as Midi from '../../midi';

export abstract class TriggerInput {
  abstract toString(): string;
}

export class KeyPressTriggerInput extends TriggerInput {
  key?: number;
  keyboardId?: number;

  constructor(key?: number, keyboardId?: number) {
    super();
    this.key = key;
    this.keyboardId = keyboardId;
  }

  toString() {
    return `${this.key ? Midi.midiNoteNumberToName(this.key) : '[unset key]'} pressed`;
  }
}

export class ControlTriggerInput extends TriggerInput {
  controller: number;
  value: number;

  constructor(controller: number, value: number) {
    super();
    this.controller = controller;
    this.value = value;
  }

  toString() {
    return `${Midi.shortCCName(this.controller)}@${this.value}`;
  }
}

export abstract class TriggerAction {
  abstract toString(): string;
}

export class StepTriggerAction extends TriggerAction {
  reverse: boolean;

  constructor(reverse?: boolean) {
    super();
    this.reverse = !!reverse;
  }

  toString() {
    return this.reverse ? 'Prev cue' : 'Next cue';
  }
}

export class GotoTriggerAction extends TriggerAction {
  songId: number;
  measure: LocationNumber;

  constructor(songId: number, measure: LocationNumber) {
    super();
    this.songId = songId;
    this.measure = measure;
  }

  toString() {
    // TODO: songId => song number
    return `Go to #${this.songId} m. ${this.measure.toString()}`;
  }
}

export class WaitTriggerAction extends TriggerAction {
  millis: number;

  constructor(millis: number) {
    super();
    this.millis = millis;
  }

  toString() {
    return `Wait ${this.millis}ms`;
  }
}

export class PanicTriggerAction extends TriggerAction {
  toString() {
    return 'Panic (all notes off)';
  }
}

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
