import _ from 'lodash';

import { Ided } from '../types';
import { findId, findIds } from '../utils/id';

export const CRUD = <T extends Ided>(
  objects: T[],
  setObjects: (newObjects: T[]) => void,
  transform: (values: T[]) => T[] = _.identity
): [
  (object: Omit<T, 'id'>) => number, // create
  (id: number) => T | undefined, // find
  (id: number, props: Partial<T>) => void, // update
  (id: number) => void, // delete
  (objects: Omit<T, 'id'>[]) => void, // addAll
  (ids: number[]) => void // deleteAll
] => {
  const createObject = (object: Omit<T, 'id'>): number => {
    const id = findId(objects);
    const newObjects = [...objects, { ...object, id } as T];
    setObjects(transform(newObjects));
    return id;
  };

  const findObject = (id: number): T | undefined => {
    return _.find(objects, (obj) => obj.id === id);
  };

  const updateObject = (id: number, props: Partial<T>) => {
    const newObjects = [...objects];
    const index = _.findIndex(objects, (obj) => obj.id === id);
    newObjects[index] = { ...newObjects[index], ...props };
    setObjects(transform(newObjects));
  };

  const deleteObject = (id: number) => {
    const newObjects = [...objects];
    _.remove(newObjects, (obj) => obj.id === id);
    setObjects(newObjects);
  };

  const addAll = (newObjects: Omit<T, 'id'>[]) => {
    const ids = findIds(objects, newObjects.length);
    const zipped = _.zip(newObjects, ids);
    const newWithIds = zipped.map(([obj, id]) => ({ ...obj!, id: id! } as T));
    setObjects(transform([...objects, ...newWithIds]));
  };

  const deleteAll = (ids: number[]) => {
    const idsSet = new Set(ids);
    const newObjects = [...objects];
    _.remove(newObjects, (obj) => idsSet.has(obj.id));
    setObjects(newObjects);
  };

  return [createObject, findObject, updateObject, deleteObject, addAll, deleteAll];
};
