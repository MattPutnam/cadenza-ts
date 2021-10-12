import React from 'react';

import _ from 'lodash';

import { AppContext } from '..';
import { Keyboard } from '../../types';

export const useKeyboards = () => {
  const { keyboards, setKeyboards } = React.useContext(AppContext);

  const addKeyboard = (newKeyboard: Keyboard) => setKeyboards([...keyboards, newKeyboard]);

  const deleteKeyboard = (toDelete: Keyboard) => {
    const newValue = [...keyboards];
    _.remove(newValue, { id: toDelete.id });
    setKeyboards(newValue);
  };

  const updateKeyboard = (id: number, newKeyboard: Partial<Keyboard>) => {
    const newValue = [...keyboards];
    const index = _.findIndex(newValue, { id });
    newValue[index] = { ...newValue[index], ...newKeyboard };
    setKeyboards(newValue);
  };

  return { keyboards, setKeyboards, addKeyboard, deleteKeyboard, updateKeyboard };
};
