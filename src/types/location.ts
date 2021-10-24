import _ from 'lodash';

export type LocationNumber =
  | { numberPart: number }
  | { letterPart: string }
  | { numberPart: number; letterPart: string };

type LenientLocationNumber = { numberPart: number | undefined; letterPart: string | undefined };

export const printLocation = (location: LocationNumber): string => {
  const lenient = location as LenientLocationNumber;
  const { numberPart, letterPart } = lenient;
  return `${numberPart || ''}${letterPart || ''}`;
};

export const locationEquals = (loc1: LocationNumber, loc2: LocationNumber): boolean => {
  const lenient1 = loc1 as LenientLocationNumber;
  const lenient2 = loc2 as LenientLocationNumber;
  return lenient1.numberPart === lenient2.numberPart && lenient1.letterPart === lenient2.letterPart;
};

export interface HasLocation {
  location: LocationNumber;
}

export const compareLocation = (l1: LocationNumber, l2: LocationNumber): number => {
  const lenient1 = l1 as LenientLocationNumber;
  const lenient2 = l2 as LenientLocationNumber;
  if (lenient1.numberPart !== lenient2.numberPart) {
    return (lenient1.numberPart || -1) - (lenient2.numberPart || -1);
  } else if (lenient1.letterPart !== lenient2.letterPart) {
    if (lenient1.letterPart === undefined) {
      return -1;
    } else if (lenient2.letterPart === undefined) {
      return 1;
    } else {
      return lenient1.letterPart < lenient2.letterPart ? -1 : 1;
    }
  } else {
    return 0;
  }
};

export const compareHasLocation = <T extends HasLocation>(o1: T, o2: T): number => {
  return compareLocation(o1.location, o2.location);
};

const pattern = /^(\d*)([a-zA-Z]*)$/;

export const isValidLocation = (location: string): boolean => {
  return !!location && location.match(pattern) !== null;
};

export const parseLocation = (location: string): LocationNumber => {
  const [_, numberString, letterString] = location.match(pattern)!;
  const numberPart = numberString.length > 0 ? parseInt(numberString, 10) : undefined;
  const letterPart = letterString.length > 0 ? letterString : undefined;
  if (numberPart) {
    if (letterPart) {
      return { numberPart, letterPart };
    } else {
      return { numberPart };
    }
  } else {
    if (letterPart) {
      return { letterPart };
    } else {
      throw new Error('Invalid location string');
    }
  }
};

export const generateNext = (location: LocationNumber, avoid: LocationNumber[] = []): LocationNumber => {
  const lenientLocation = location as LenientLocationNumber;
  const toAvoid = avoid.filter((a) => (a as LenientLocationNumber).letterPart === undefined);

  let candidate = (lenientLocation.numberPart || 0) + 1;

  const test = (a: LenientLocationNumber) => a.numberPart === candidate;
  while (!!_.find(toAvoid, test)) {
    ++candidate;
  }

  return { numberPart: candidate };
};
