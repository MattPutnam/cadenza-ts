import React from 'react';

import { AppContext } from '..';
import { CRUD } from '../utils';

export const useKeyboards = () => {
  const { keyboards, setKeyboards } = React.useContext(AppContext);

  const [createKeyboard, findKeyboard, updateKeyboard, deleteKeyboard] = CRUD(keyboards, setKeyboards);

  return { keyboards, setKeyboards, createKeyboard, findKeyboard, updateKeyboard, deleteKeyboard };
};
