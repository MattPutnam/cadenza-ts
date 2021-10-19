import React from 'react';

import { AppContext } from '..';
import { CRUD } from '../utils';

export const useKeyboards = () => {
  const { keyboards, setKeyboards } = React.useContext(AppContext);

  const [addKeyboard, deleteKeyboard, updateKeyboard] = CRUD(keyboards, setKeyboards);

  return { keyboards, setKeyboards, addKeyboard, deleteKeyboard, updateKeyboard };
};
