import { Ided, Mappable, Transposeable } from '..';

export interface PatchAddress {
  synthesizer: string;
  bank: string;
  number: number | [number, number];
}

export interface PatchDefinition extends PatchAddress {
  synthesizerId: number;
  name: string;
}

export interface PatchSelection extends PatchDefinition, Ided, Mappable, Transposeable {
  volume: number;
}
