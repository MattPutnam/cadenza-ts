import { Mappable, OpenRange, Transposeable } from '..';

export interface PatchUsage extends Mappable, Transposeable {
  keyboardId: number;
  patchId: number;
  attributes: {
    type: string; // TODO
  };
  range: OpenRange;
}
