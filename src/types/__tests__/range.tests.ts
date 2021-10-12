import * as Range from '../range';

describe('range', () => {
  it('converts from closed to open', () => {
    expect(Range.toOpen({ lowNote: 5, highNote: Infinity })).toEqual({ lowNote: 5 });
    expect(Range.toOpen({ lowNote: -Infinity, highNote: 5 })).toEqual({ highNote: 5 });
  });

  it('converts from open to closed', () => {
    expect(Range.toClosed({ lowNote: 5 })).toEqual({ lowNote: 5, highNote: Infinity });
    expect(Range.toClosed({ highNote: 5 })).toEqual({ lowNote: -Infinity, highNote: 5 });
  });

  it('computes closed spans', () => {
    expect(Range.span({ lowNote: 1, highNote: 2 }, { lowNote: 3, highNote: 4 })).toEqual({ lowNote: 1, highNote: 4 });
    expect(Range.span({ lowNote: 1, highNote: 4 }, { lowNote: 2, highNote: 3 })).toEqual({ lowNote: 1, highNote: 4 });
    expect(Range.span({ lowNote: 1, highNote: 3 }, { lowNote: 2, highNote: 4 })).toEqual({ lowNote: 1, highNote: 4 });
  });

  it('computes open spans', () => {
    expect(Range.span({ lowNote: 10 }, { lowNote: 5, highNote: 15 })).toEqual({ lowNote: 5, highNote: Infinity });
    expect(Range.span({ highNote: 10 }, { lowNote: 5, highNote: 15 })).toEqual({ lowNote: -Infinity, highNote: 15 });
    expect(Range.span({ lowNote: 5 }, { highNote: 10 })).toEqual({ lowNote: -Infinity, highNote: Infinity });
  });
});
