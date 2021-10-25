import _ from 'lodash';

import { Ided } from '../types';

export const findId = (objs: Ided[]) => {
  let candidate = 0;
  while (_.some(objs, { id: candidate })) {
    candidate++;
  }
  return candidate;
};

export const findIds = (objs: Ided[], n: number) => {
  let candidate = 0;
  let count = 0;
  const result: number[] = [];
  while (count < n) {
    while (_.some(objs, { id: candidate })) {
      candidate++;
    }
    result.push(candidate);
    candidate++;
    count++;
  }
  return result;
};
