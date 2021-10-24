import { isValidLocation, parseLocation, printLocation, compareLocation, generateNext } from '../location';

describe('location', () => {
  it('tests for valid location number strings correctly', () => {
    expect(isValidLocation('1a')).toBe(true);
    expect(isValidLocation('7')).toBe(true);
    expect(isValidLocation('bbb')).toBe(true);

    expect(isValidLocation('a1')).toBe(false);
    expect(isValidLocation('1a1')).toBe(false);
    expect(isValidLocation('')).toBe(false);
  });

  it('parses location number strings correctly', () => {
    expect(parseLocation('123')).toEqual({ numberPart: 123 });
    expect(parseLocation('abc')).toEqual({ letterPart: 'abc' });
    expect(parseLocation('456def')).toEqual({ numberPart: 456, letterPart: 'def' });
  });

  it('prints location numbers correctly', () => {
    expect(printLocation({ numberPart: 3 })).toEqual('3');
    expect(printLocation({ letterPart: 'g' })).toEqual('g');
    expect(printLocation({ numberPart: 52, letterPart: 'fpx' })).toEqual('52fpx');
  });

  it('sorts location numbers correctly', () => {
    const start = ['5', '3', '1a', '3b', 'c', '2z', '1b', '1'];
    const end = ['c', '1', '1a', '1b', '2z', '3', '3b', '5'];
    const locationNumbers = start.map(parseLocation);
    locationNumbers.sort(compareLocation);
    expect(locationNumbers.map(printLocation)).toEqual(end);
  });

  it('generates next location numbers correctly', () => {
    expect(generateNext({ numberPart: 1 })).toEqual({ numberPart: 2 });
    expect(generateNext({ numberPart: 2, letterPart: 'a' })).toEqual({ numberPart: 3 });
    expect(generateNext({ numberPart: 3 }, [{ numberPart: 4, letterPart: 'a' }])).toEqual({ numberPart: 4 });
    expect(generateNext({ numberPart: 3, letterPart: 'a' }, [{ numberPart: 4 }])).toEqual({ numberPart: 5 });
  });
});
