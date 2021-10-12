import _ from 'lodash';

import { Ided } from '../types';

export const findId = (objs: Ided[]) => {
  let candidate = 0;
  while (_.some(objs, { id: candidate })) {
    candidate++;
  }
  return candidate;
};
