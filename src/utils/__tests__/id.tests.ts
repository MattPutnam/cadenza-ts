import { findId, findIds } from '../id';

describe('utils/id', () => {
  it('finds single ids correctly', () => {
    expect(findId([])).toBe(0);
    expect(findId([{ id: 0 }])).toBe(1);
    expect(findId([{ id: 0 }, { id: 1 }])).toBe(2);
    expect(findId([{ id: 0 }, { id: 1 }, { id: 3 }])).toBe(2);
  });

  it('finds multiple ids correctly', () => {
    expect(findIds([], 5)).toEqual([0, 1, 2, 3, 4]);
    expect(findIds([{ id: 2 }], 5)).toEqual([0, 1, 3, 4, 5]);
    expect(findIds([{ id: 1 }, { id: 3 }, { id: 5 }], 5)).toEqual([0, 2, 4, 6, 7]);
  });
});
