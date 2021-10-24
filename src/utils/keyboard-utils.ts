import _ from 'lodash';

import { KeyboardDefinition, PatchUsage, Range } from '../types';

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

export const getDimensions = (keyboardRange: Range, [lowNote, highNote]: Range): { left: number; width: number } => {
  let left = 0;
  if (lowNote > keyboardRange[0]) {
    left =
      _.range(keyboardRange[0], lowNote).filter(isWhite).length * WHITE_WIDTH -
      (isBlack(lowNote) ? leftMargin(lowNote) : 0);
  }

  const realLow = Math.max(keyboardRange[0], lowNote);
  const realHigh = Math.min(keyboardRange[1], highNote);
  const width =
    _.range(realLow, realHigh + 1).filter(isWhite).length * WHITE_WIDTH +
    (isBlack(realLow) ? leftMargin(realLow) : 0) +
    (isBlack(realHigh) ? leftMargin(realHigh + 1) : 0) +
    1;

  return { left, width };
};

export const groupIntoRows = (patchUsages: PatchUsage[]): PatchUsage[][] => {
  const rows: PatchUsage[][] = [];

  const sorted = _.sortBy(patchUsages, (patchUsage) => patchUsage.range[1]);

  const filter = (head: PatchUsage) => (candidate: PatchUsage) => candidate.range[0] > head.range[1];

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

  return rows;
};

export const createSubKeyboard = (
  keyboard: KeyboardDefinition,
  range: Range
): { keyboard: Pick<KeyboardDefinition, 'id' | 'range'>; offsetLeft: number } => {
  const [lowNote, __] = range;

  const dimensions = lowNote > keyboard.range[0] ? getDimensions(keyboard.range, [0, lowNote - 1]) : { width: 0 };

  return {
    keyboard: {
      id: -1,
      range
    },
    offsetLeft: dimensions.width - (isBlack(lowNote) ? leftMargin(lowNote) : 0)
  };
};
