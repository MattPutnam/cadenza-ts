import { Mappable, MappingType, Range, Transposeable } from '..';

export abstract class PatchUsage implements Mappable, Transposeable {
  keyboardId: number;
  patchId: number;
  range: Range;
  mapping: MappingType;
  transposition: number;

  constructor(keyboardId: number, patchId: number, range: Range, mapping: MappingType, transposition: number) {
    this.keyboardId = keyboardId;
    this.patchId = patchId;
    this.range = range;
    this.mapping = mapping;
    this.transposition = transposition;
  }
}

export class NormalPatchUsage extends PatchUsage {
  monophonic: boolean;

  constructor(
    keyboardId: number,
    patchId: number,
    range: Range,
    mapping: MappingType,
    transposition: number,
    monophonic: boolean
  ) {
    super(keyboardId, patchId, range, mapping, transposition);
    this.monophonic = monophonic;
  }

  clone(monophonic: boolean) {
    return new NormalPatchUsage(
      this.keyboardId,
      this.patchId,
      this.range,
      this.mapping,
      this.transposition,
      monophonic
    );
  }
}

export type GhostNotesMapping = Record<number, number[]>;

export class GhostNotesPatchUsage extends PatchUsage {
  mappedNotes: GhostNotesMapping;
  passthrough: boolean;

  constructor(
    keyboardId: number,
    patchId: number,
    range: Range,
    mapping: MappingType,
    transposition: number,
    mappedNotes: GhostNotesMapping,
    passthrough: boolean
  ) {
    super(keyboardId, patchId, range, mapping, transposition);
    this.mappedNotes = mappedNotes;
    this.passthrough = passthrough;
  }

  clone(mappedNotes: GhostNotesMapping, passthrough: boolean) {
    return new GhostNotesPatchUsage(
      this.keyboardId,
      this.patchId,
      this.range,
      this.mapping,
      this.transposition,
      mappedNotes,
      passthrough
    );
  }
}

export type HarpPedalPosition = -1 | 0 | 1;
export type PedalPositions = HarpPedalPosition[];
export class HarpPedalsPatchUsage extends PatchUsage {
  pedalPositions: PedalPositions;

  constructor(
    keyboardId: number,
    patchId: number,
    range: Range,
    mapping: MappingType,
    transposition: number,
    pedalPositions: PedalPositions
  ) {
    super(keyboardId, patchId, range, mapping, transposition);
    this.pedalPositions = pedalPositions;
  }

  clone(pedalPositions: PedalPositions) {
    return new HarpPedalsPatchUsage(
      this.keyboardId,
      this.patchId,
      this.range,
      this.mapping,
      this.transposition,
      pedalPositions
    );
  }
}
