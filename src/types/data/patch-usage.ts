import { Mappable, Range, Transposeable } from '..';

type BasePatchUsage = Mappable &
  Transposeable & {
    keyboardId: number;
    patchId: number;
    range: Range;
  };

type NormalPatchUsage = BasePatchUsage & {
  type: 'normal';
  monophonic: boolean;
};

export type GhostNotesMapping = Record<number, number[]>;

type GhostNotesPatchUsage = BasePatchUsage & {
  type: 'ghost-notes';
  mappedNotes: GhostNotesMapping;
  passthrough: boolean;
};

export type HarpPedalPosition = -1 | 0 | 1;
export type PedalPositions = [
  HarpPedalPosition,
  HarpPedalPosition,
  HarpPedalPosition,
  HarpPedalPosition,
  HarpPedalPosition,
  HarpPedalPosition,
  HarpPedalPosition
];

type HarpPedalsPatchUsage = BasePatchUsage & {
  type: 'harp-pedals';
  pedalPositions: PedalPositions;
};

export type PatchUsage = NormalPatchUsage | GhostNotesPatchUsage | HarpPedalsPatchUsage;
