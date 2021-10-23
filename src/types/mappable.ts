export type MaybeController = number | 'none';
export type MappingType = Record<number, MaybeController>;

export interface Mappable {
  mapping: MappingType;
}
