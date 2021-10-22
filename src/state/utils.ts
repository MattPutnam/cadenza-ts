import _ from 'lodash';

import { Ided } from '../types';

export const CRUD = <T extends Ided>(
  objects: T[],
  setObjects: (newObjects: T[]) => void,
  transform: (values: T[]) => T[] = _.identity
): [
  (object: T) => void,
  (object: T) => void,
  (id: number, props: Partial<T>) => void,
  (objects: T[]) => void,
  (objects: T[]) => void
] => {
  const addObject = (object: T) => {
    const newObjects = [...objects, object];
    setObjects(transform(newObjects));
  };

  const deleteObject = (object: T) => {
    const newObjects = [...objects];
    _.remove(newObjects, (obj) => obj.id === object.id);
    setObjects(newObjects);
  };

  const updateObject = (objectId: number, props: Partial<T>) => {
    const newObjects = [...objects];
    const index = _.findIndex(objects, (obj) => obj.id === objectId);
    newObjects[index] = { ...newObjects[index], ...props };
    setObjects(transform(newObjects));
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

  return [addObject, deleteObject, updateObject, addAll, deleteAll];
};
