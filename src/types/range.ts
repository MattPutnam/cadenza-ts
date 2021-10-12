export interface ClosedRange {
  lowNote: number;
  highNote: number;
}

export interface OpenRange {
  lowNote?: number;
  highNote?: number;
}

export type Range = ClosedRange | OpenRange;

export const toClosed = ({ lowNote, highNote }: OpenRange): ClosedRange => ({
  lowNote: lowNote || -Infinity,
  highNote: highNote || Infinity
});

export const toOpen = ({ lowNote, highNote }: ClosedRange): OpenRange => ({
  lowNote: lowNote === -Infinity ? undefined : lowNote,
  highNote: highNote === Infinity ? undefined : highNote
});

export const span = (r1: Range, r2: Range): Range => {
  const lowNote = Math.min(r1.lowNote || -Infinity, r2.lowNote || -Infinity);
  const highNote = Math.max(r1.highNote || Infinity, r2.highNote || Infinity);
  return { lowNote, highNote };
};

export const defaultRange = {
  lowNote: 21,
  highNote: 108
};
