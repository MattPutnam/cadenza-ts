import { HasLocation, HasTriggers, Ided, Mappable, PatchUsage, Transposeable } from '..';

export interface Song extends HasLocation, Ided, Mappable, Transposeable, HasTriggers {
  name: string;
}

export interface Cue extends HasLocation, Ided, Mappable, HasTriggers {
  songId: number;
  patchUsages: PatchUsage[];
}
