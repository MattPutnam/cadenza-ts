import React from 'react';

export const useReorder = <T>(objs: T[], setObjs: (newValue: T[]) => void) => {
  const moveUp = React.useCallback(
    (index: number) => () => {
      const copy = [...objs];
      const elem = copy[index];
      const prev = copy[index - 1];
      copy[index - 1] = elem;
      copy[index] = prev;
      setObjs(copy);
    },
    [objs, setObjs]
  );

  const moveDown = React.useCallback(
    (index: number) => () => {
      const copy = [...objs];
      const elem = copy[index];
      const next = copy[index + 1];
      copy[index + 1] = elem;
      copy[index] = next;
      setObjs(copy);
    },
    [objs, setObjs]
  );

  return [moveUp, moveDown];
};
