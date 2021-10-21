import { LocationNumber, isValidLocation, parseLocation, compareLocation, generateNext } from '../location';

describe('location', () => {
  it('throws when trying to construct an empty LocationNumber', () => {
    expect(() => new LocationNumber(undefined, undefined)).toThrowError();
  });

  it("doesn't throw when trying to construct a valid LocationNumber", () => {
    expect(() => new LocationNumber(5, 'a')).not.toThrowError();
  });

  it('tests for valid location number strings correctly', () => {
    expect(isValidLocation('1a')).toBe(true);
    expect(isValidLocation('7')).toBe(true);
    expect(isValidLocation('bbb')).toBe(true);

    expect(isValidLocation('a1')).toBe(false);
    expect(isValidLocation('1a1')).toBe(false);
    expect(isValidLocation('')).toBe(false);
  });

  it('parses location number strings correctly', () => {
    expect(parseLocation('123')).toEqual(new LocationNumber(123, undefined));
    expect(parseLocation('abc')).toEqual(new LocationNumber(undefined, 'abc'));
    expect(parseLocation('456def')).toEqual(new LocationNumber(456, 'def'));
  });

  it('sorts location numbers correctly', () => {
    const start = ['5', '3', '1a', '3b', 'c', '2z', '1b', '1'];
    const end = ['c', '1', '1a', '1b', '2z', '3', '3b', '5'];
    const locationNumbers = start.map(parseLocation);
    locationNumbers.sort(compareLocation);
    expect(locationNumbers.map((l) => l.toString())).toEqual(end);
  });

  it('generates next location numbers correctly', () => {
    expect(generateNext(new LocationNumber(1, undefined))).toEqual(new LocationNumber(2, undefined));
    expect(generateNext(new LocationNumber(2, 'a'))).toEqual(new LocationNumber(3, undefined));
    expect(generateNext(new LocationNumber(3, undefined), [new LocationNumber(4, 'a')])).toEqual(
      new LocationNumber(4, undefined)
    );
    expect(generateNext(new LocationNumber(3, 'a'), [new LocationNumber(4, undefined)])).toEqual(
      new LocationNumber(5, undefined)
    );
  });
});
