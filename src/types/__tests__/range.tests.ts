import * as Range from '../range';

describe('range', () => {
  it('computes spans', () => {
    expect(Range.span([1, 2], [3, 4])).toEqual([1, 4]);
    expect(Range.span([1, 4], [2, 3])).toEqual([1, 4]);
    expect(Range.span([1, 3], [2, 4])).toEqual([1, 4]);
  });
});
