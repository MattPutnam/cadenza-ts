import _ from 'lodash';

export class LocationNumber {
  numberPart: number | undefined;
  letterPart: string | undefined;

  constructor(numberPart: number | undefined, letterPart: string | undefined) {
    if (numberPart === undefined && letterPart === undefined) {
      throw Error('LocationNumber must have at least one of numberPart and letterPart');
    }

    this.numberPart = numberPart || undefined; // prevent 0
    this.letterPart = letterPart || undefined; // prevent ''
  }

  toString(): string {
    return `${this.numberPart || ''}${this.letterPart || ''}`;
  }

  equals(other: LocationNumber) {
    return this.numberPart === other.numberPart && this.letterPart === other.letterPart;
  }
}

export interface HasLocation {
  location: LocationNumber;
}

export const compareLocation = (l1: LocationNumber, l2: LocationNumber): number => {
  if (l1.numberPart !== l2.numberPart) {
    return (l1.numberPart || -1) - (l2.numberPart || -1);
  } else if (l1.letterPart !== l2.letterPart) {
    if (l1.letterPart === undefined) {
      return -1;
    } else if (l2.letterPart === undefined) {
      return 1;
    } else {
      return l1.letterPart < l2.letterPart ? -1 : 1;
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
  return new LocationNumber(numberPart, letterPart);
};

export const generateNext = (location: LocationNumber, avoid: LocationNumber[] = []): LocationNumber => {
  const toAvoid = avoid.filter((a) => a.letterPart === undefined);

  let candidate = (location.numberPart || 0) + 1;

  const test = (a: LocationNumber) => a.numberPart === candidate;
  while (!!_.find(toAvoid, test)) {
    ++candidate;
  }

  return new LocationNumber(candidate, undefined);
};
