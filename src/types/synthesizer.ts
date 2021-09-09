import { ExpansionCardType } from './expansion';

export type BankSelectionCCCommand = {
  type: 'CC';
  number: number;
  value: number;
};

export type BankSelectionPCCommand = {
  type: 'PC';
  value?: number;
};

export type BankSelectionCommand = BankSelectionCCCommand | BankSelectionPCCommand;

export const isCC = (command: BankSelectionCommand): command is BankSelectionCCCommand => {
  return command.type === 'CC';
};

export const isPC = (command: BankSelectionCommand): command is BankSelectionPCCommand => {
  return command.type === 'PC';
};

export interface BankSelectionDefinition {
  rangeLow?: number;
  rangeHigh?: number;
  commands: BankSelectionCommand[];
}

export interface ExpansionDefinition {
  name: string;
  type: ExpansionCardType;
  toSelect: BankSelectionDefinition[] | 'SELECT_BY_CARD';
}

export interface BankDefinition {
  name: string;
  isUser?: boolean;
  toSelect: BankSelectionDefinition[];
  patches: string[];
  index?: number;
}

export interface Synthesizer {
  name: string;
  expansions: ExpansionDefinition[];
  banks: (BankDefinition | 'GM' | 'GM1' | 'GM2')[];
  cardSelectors?: Record<string, BankSelectionDefinition[]>;
}
