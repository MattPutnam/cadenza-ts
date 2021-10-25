import _ from 'lodash';

import { Ided } from '../types';

export const CRUD = <T extends Ided>(
  objects: T[],
  setObjects: (newObjects: T[]) => void,
  transform: (values: T[]) => T[] = _.identity
): [
  (object: T) => void, // create
  (id: number) => T | undefined, // find
  (id: number, props: Partial<T>) => void, // update
  (id: number) => void, // delete
  (objects: T[]) => void, // addAll
  (objects: T[]) => void // deleteAll
] => {
  const createObject = (object: T) => {
    const newObjects = [...objects, object];
    setObjects(transform(newObjects));
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

  const addAll = (newObjects: T[]) => {
    setObjects(transform([...objects, ...newObjects]));
  };

  const deleteAll = (toDelete: T[]) => {
    const targetIds = new Set(toDelete.map((obj) => obj.id));
    const newObjects = [...objects];
    _.remove(newObjects, (obj) => targetIds.has(obj.id));
    setObjects(newObjects);
  };

  return [createObject, findObject, updateObject, deleteObject, addAll, deleteAll];
};
