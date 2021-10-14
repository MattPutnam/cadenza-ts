import React from 'react';

import { AppContext } from '../../state';
import { ActionPedal } from '../../types';

export const useActionPedal = () => {
  const { actionPedal, setActionPedal } = React.useContext(AppContext);

  const updateActionPedal = (params: Partial<ActionPedal>) => {
    if (!actionPedal) {
      throw new Error('Cannot update undefined action pedal');
    }
    setActionPedal({ ...actionPedal, ...params });
  };

  return { actionPedal, setActionPedal, updateActionPedal };
};
