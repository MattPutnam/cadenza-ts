export class LocationNumber {
  numberPart: number | undefined;
  letterPart: string | undefined;

  constructor(numberPart: number | undefined, letterPart: string | undefined) {
    this.numberPart = numberPart;
    this.letterPart = letterPart;
  }

  toString(): string {
    return `${this.numberPart || ''}${this.letterPart || ''}`;
  }
}

export interface HasLocation {
  location: LocationNumber;
}

export const compareLocation = (l1: LocationNumber, l2: LocationNumber): number => {
  if (l1.numberPart !== l2.numberPart) {
    return (l2.numberPart || -1) - (l1.numberPart || -1);
  } else if (l1.letterPart !== l2.letterPart) {
    if (l1.letterPart === undefined) {
      return 1;
    } else if (l2.letterPart === undefined) {
      return -1;
    } else {
      return l2.letterPart > l1.letterPart ? 1 : -1;
    }
  } else {
    return 0;
  }
};

export const compareHasLocation = <T extends HasLocation>(o1: T, o2: T): number => {
  return compareLocation(o1.location, o2.location);
};

const pattern = /(\d*)([a-zA-Z]*)/;

export const isValidLocation = (location: string): boolean => {
  return location.match(pattern) !== null;
};

export const parseLocation = (location: string): LocationNumber => {
  const [_, numberString, letterString] = location.match(pattern)!;
  const numberPart = numberString.length > 0 ? parseInt(numberString, 10) : undefined;
  const letterPart = letterString.length > 0 ? letterString : undefined;
  return new LocationNumber(numberPart, letterPart);
};
