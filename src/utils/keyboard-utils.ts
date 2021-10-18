import _ from 'lodash';

import { ClosedRange, KeyboardDefinition, PatchUsage, toClosed } from '../types';

export const WHITE_HEIGHT = 81; // height of white key
export const WHITE_WIDTH = 14; // width of white key
export const BLACK_HEIGHT = 50; // height of black key
export const BLACK_WIDTH = 11; // width of black key

const CUT_HALF = WHITE_WIDTH / 2; // cut-in of C# into C, half the width of a white key
const CUT_NEGHALF = BLACK_WIDTH - CUT_HALF; // cut-in of C# into D, the remaining part of the black key
const CUT_MIDHALF = BLACK_WIDTH / 2; // cut-in of G# into G or A, half the width of a black key

const LEFT_MARGINS = [
  0,
  CUT_HALF,
  CUT_NEGHALF,
  CUT_NEGHALF,
  CUT_HALF,
  0,
  CUT_HALF,
  CUT_NEGHALF,
  CUT_MIDHALF,
  CUT_MIDHALF,
  CUT_NEGHALF,
  CUT_HALF
];

export const leftMargin = (note: number): number => LEFT_MARGINS[note % 12];

const BLACK_NOTES_MOD = new Set([1, 3, 6, 8, 10]);
export const isWhite = (note: number): boolean => !isBlack(note);
export const isBlack = (note: number): boolean => BLACK_NOTES_MOD.has(note % 12);

export const getDimensions = (
  keyboardRange: ClosedRange,
  { lowNote, highNote }: ClosedRange
): { left: number; width: number } => {
  let left = 0;
  if (lowNote && lowNote > keyboardRange.lowNote) {
    left =
      _.range(keyboardRange.lowNote, lowNote).filter(isWhite).length * WHITE_WIDTH -
      (isBlack(lowNote) ? leftMargin(lowNote) : 0);
  }

  const realLow = lowNote ? Math.max(keyboardRange.lowNote, lowNote) : keyboardRange.lowNote;
  const realHigh = highNote ? Math.min(keyboardRange.highNote, highNote) : keyboardRange.highNote;
  const width =
    _.range(realLow, realHigh + 1).filter(isWhite).length * WHITE_WIDTH +
    (isBlack(realLow) ? leftMargin(realLow) : 0) +
    (isBlack(realHigh) ? leftMargin(realHigh + 1) : 0) +
    1;

  return { left, width };
};

export const groupIntoRows = (patchUsages: PatchUsage[]): PatchUsage[][] => {
  const [fulls, partials] = _.partition(
    patchUsages,
    (patchUsage) => !patchUsage.range.lowNote && !patchUsage.range.highNote
  );
  const rows = fulls.map((full) => [full]);

  partials.forEach((patchUsage) => (patchUsage.range = toClosed(patchUsage.range)));
  const sorted = _.sortBy(partials, 'highNote');

  const filter = (head: PatchUsage) => (candidate: PatchUsage) => candidate.range.lowNote! > head.range.highNote!;

  while (!_.isEmpty(sorted)) {
    const accumulation: PatchUsage[] = [];
    let candidates = _.clone(sorted);
    let head = sorted.shift()!;
    accumulation.push(head);
    candidates = _.filter(candidates, filter(head));

    while (!_.isEmpty(candidates)) {
      head = candidates.shift()!;
      _.remove(sorted, head);
      accumulation.push(head);
      candidates = _.filter(candidates, filter(head));
    }

    rows.push(accumulation);
  }

  rows.forEach((row) => {
    row.forEach((patchUsage) => {
      if (patchUsage.range.highNote === Infinity) {
        delete patchUsage.range.highNote;
      }
      if (patchUsage.range.lowNote === -Infinity) {
        delete patchUsage.range.lowNote;
      }
    });
  });

  return rows;
};

export const createSubKeyboard = (
  keyboard: KeyboardDefinition,
  range: ClosedRange
): { keyboard: Partial<KeyboardDefinition>; offsetLeft: number } => {
  const { lowNote, highNote } = range;

  const newLow = lowNote || keyboard.range.lowNote;
  const newHigh = highNote || keyboard.range.highNote;

  const dimensions =
    lowNote > keyboard.range.lowNote
      ? getDimensions(keyboard.range, { highNote: lowNote - 1, lowNote: 0 })
      : { width: 0 };

  return {
    keyboard: {
      range: {
        lowNote: newLow,
        highNote: newHigh
      }
    },
    offsetLeft: dimensions.width - (isBlack(newLow) ? leftMargin(newLow) : 0)
  };
};
