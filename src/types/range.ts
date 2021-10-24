export type Range = [number, number];

export const span = ([l1, h1]: Range, [l2, h2]: Range): Range => {
  return [Math.min(l1, l2), Math.max(h1, h2)];
};

export const defaultRange: Range = [21, 108];
